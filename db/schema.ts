import { integer, pgTable , timestamp , text} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod"
import { relations } from "drizzle-orm";
import { z } from "zod";

export const accounts = pgTable("accounts" , {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId : text("user_id").notNull(),
})

export const accountsRelations = relations(accounts, ({ many }) => ({
    transactions: many(transactions),
}));

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable("categories" , {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId : text("user_id").notNull(),
})

export const categoriesRelation = relations(categories, ({ many }) => ({
    transactions: many(transactions),
}));

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable("transaction" , {
    id: text("id").primaryKey(),
    amount : integer("amount").notNull(),
    payee : text("payee").notNull(),
    notes : text("text"),
    date : timestamp("date" , {mode: "date"}).notNull(),
    accountid : text("account_id").references(() => accounts.id , {
        onDelete: "cascade",
    }).notNull(),
    categoryid : text("category_id").references(() => categories.id , {
        onDelete : "set null"
    }),
})

export const transactionRelation = relations(transactions , ({one}) => ({
    account : one(accounts , {
        fields : [transactions.accountid],
        references : [accounts.id],
    }),
    categories : one(categories , {
        fields : [transactions.categoryid],
        references : [categories.id],
    })
}))

export const insertTransactionSchema = createInsertSchema(transactions , {
    date : z.coerce.date(),
});