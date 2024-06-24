import { Hono } from "hono";
import { db } from "@/db/dirzzle";
import { transactions, insertTransactionSchema , categories, accounts} from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// import { HTTPException } from "hono/http-exception";
import { and , desc, eq , inArray, lte, sql} from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import {createId} from "@paralleldrive/cuid2"
import { z } from "zod"
import {subDays , parse} from "date-fns"

const app = new Hono()
    .get(
        "/" ,
        zValidator("query" , z.object({
          from : z.string().optional(),
          to : z.string().optional(),
          accountid : z.string().optional(),
        })),
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            const { from , to , accountid } = c.req.valid("query");

            if(!auth?.userId){
                // throw new HTTPException(401, {
                //     res : c.json({error : "Unauthorised"} , 401),
                // });
                return (
                    c.json({error : "unauthorised"} , 401)
                )
            }

            const defaultTo = new Date();
            const defaultFrom = subDays(defaultTo , 30);

            const startDate = from 
              ? parse(from, "yyyy-MM-dd" , new Date())
              : defaultFrom;

            const endDate = to
              ? parse(to ,"yyyy-MM-dd" , new Date())
              : defaultTo;

            const data = await db
              .select({
                id : transactions.id,
                date : transactions.date,
                category : categories.name,
                categoryId : transactions.categoryid,
                payee : transactions.payee,
                amount : transactions.amount,
                notes : transactions.notes,
                accountid : transactions.accountid,
                account : accounts.name
              })
              .from(transactions)
              .innerJoin(accounts , eq(transactions.accountid , accounts.id))
              .leftJoin(categories , eq( transactions.categoryid , categories.id ))
              .where(
                and(
                  accountid ? eq(transactions.accountid , accountid) : undefined,
                  eq(accounts.userId , auth.userId),
                  gte(transactions.date , startDate),
                  lte(transactions.date , endDate),
                )
              )
              .orderBy(desc(transactions.date));


            return c.json({ data });
    })
    .get(
      "/:id",
      zValidator("param" , z.object({
        id: z.string().optional(),
      })),
      clerkMiddleware(),
      async(c) => {
        const auth = getAuth(c);
        const { id } = c.req.valid("param");

        if(!id){
          return c.json({ error : " Missing ID "} , 400);
        }

        if(!auth?.userId){
          return c.json({ error : " unauthorised "} , 401);
        }

        const [data] = await db
          .select({
            id : transactions.id,
            date : transactions.date,
            categoryId : transactions.categoryid,
            payee : transactions.payee,
            amount : transactions.amount,
            notes : transactions.notes,
            accountid : transactions.accountid,
          })
          .from(transactions)
          .innerJoin(accounts , eq(transactions.accountid , accounts.id))
          .where(
            and(
              eq(accounts.userId , auth.userId),
              eq(transactions.id , id),
            ),
          );

          if(!data){
            return c.json({error : "Not Found"} , 404);
          }

          return c.json({data});
      }
    )
    .post(
        "/" ,
        clerkMiddleware(),
        zValidator("json" , 
          insertTransactionSchema.omit({
            id:true,
        })
      ),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if(!auth?.userId){
                return c.json({error : "unauthorised"} , 401)
            }

            const [data] = await db
              .insert(transactions)
              .values({
                id: createId(),
                ...values,
            })
            .returning();

            return c.json({ data })
    })
    .post(
      "/bulk-delete",
      clerkMiddleware(),
      zValidator(
        "json",
        z.object({
          ids: z.array(z.string()),
        }),
      ),
      async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("json");
        
        if (!auth?.userId) {
          return c.json({ error: "unauthorized" }, 401);
        }
    
        const transactionToDelete = db.$with("transaction_to_delete").as(
          db.select({ id: transactions.id }).from(transactions)
            .innerJoin(accounts, eq(transactions.accountid, accounts.id))
            .where(and(
              inArray(transactions.id, values.ids),
              eq(accounts.userId, auth.userId),
            ))
        );
    
        const data = await db
          .with(transactionToDelete)
          .delete(transactions)
          .where(
            inArray(transactions.id, sql`(select id from ${transactionToDelete})`)
          )
          .returning({
            id: transactions.id,
          });
    
        return c.json({ data });
      },
    )
    .patch(
      "/:id",
      clerkMiddleware(),
      zValidator(
        "param" , 
        z.object({
          id : z.string().optional(),
        }),
      ),
      zValidator(
        "json",
        insertTransactionSchema.omit({
          id : true,
        })
      ),
      async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.valid("param");
        const values = c.req.valid("json");

        if(!id){
          return c.json({error : "id missing"} , 400);
        }

        if(!auth?.userId){
          return c.json({ error : "unauthorised "} , 401);
        }

        const transactionToUpdate = db.$with("transaction_to_update").as(
          db.select({ id: transactions.id }).from(transactions)
            .innerJoin(accounts, eq(transactions.accountid, accounts.id))
            .where(and(
              eq(transactions.id, id),
              eq(accounts.userId, auth.userId),
            )),
        );

        const [data] = await db
        .with(transactionToUpdate)
        .update(transactions)
        .set(values)
        .where(
          inArray(transactions.id, sql`(select id from ${transactionToUpdate})`),
        )
        .returning();


          if(!data){
            return c.json({ error : "not found"} , 404);
          }

          return c.json({ data });
      }
    )
    .delete(
      "/:id",
      clerkMiddleware(),
      zValidator(
        "param" , 
        z.object({
          id : z.string().optional(),
        }),
      ),
      async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.valid("param");

        if(!id){
          return c.json({error : "id missing"} , 400);
        }

        if(!auth?.userId){
          return c.json({ error : "unauthorised "} , 401);
        }

        const transactionToDelete = db.$with("transaction_to_delete").as(
          db.select({ id : transactions.id }).from(transactions)
            .innerJoin(accounts , eq(transactions.accountid , accounts.id))
            .where(and(
              eq(transactions.id , id),
              eq(accounts.userId , auth.userId),
            ))
        )

        const [ data ] = await db
          .with(transactionToDelete)
          .delete(transactions)
          .where(
            inArray(
              transactions.id,
              sql`(select id from ${transactionToDelete})`
            ),
          )
          .returning({
            id : transactions.id,
          })


          if(!data){
            return c.json({ error : "not found"} , 404);
          }

          return c.json({ data });
      }
    )

export default app;
 
// import { Context } from 'hono';

// const accounts = (c: Context) => {
//   return c.json({ accounts: [] });
// };

// export default accounts;