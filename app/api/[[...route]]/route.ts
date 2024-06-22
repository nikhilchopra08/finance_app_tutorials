import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware , getAuth } from "@hono/clerk-auth";
import accounts from "./accounts"
import { HTTPException } from "hono/http-exception";

// import authors from "./authors";
// import books from "./books";

export const runtime  = 'edge'

const app = new Hono().basePath('/api')

// app.onError((err , c ) => {
//     if(err instanceof HTTPException){
//         return err.getResponse();
//     }

//     return (
//         c.json({error : "Internal Server Error"} , 500)
//     )
// })

const routes = app.route("/accounts" , accounts)


// by default
// app.get("/" , (c) => {
//     return c.json({hello : "world"})
// })

// routing
// app.route("/authors" , authors);
// app.route("/books" , books);

// get , post 
    // .get('/hello' , clerkMiddleware() , (c) => {
    //     const auth = getAuth(c);

    //     if(!auth?.userId){
    //         return c.json({error : "unauthorized"})
    //     }
    //     return c.json({
    //         message: 'Hello NextJs!',
    //         userId : auth.userId
    //     })
    // })
    // .get('/hello/:text',
    //     zValidator("param" , z.object({
    //         text : z.string(),
    //     })) , (c) => {
    //     const text = c.req.valid("param");

    //     return c.json({
    //         message : 'hello text',
    //         text : text
    //     })
    // })
    // .post('/' , 
    //     zValidator("json" , z.object({
    //         name: z.string(),
    //         userId : z.number()
    //     })),
    //     zValidator("param" , z.object({
    //         postId : z.number(),
    //     })),

    //     (c) => {
    //         const {name , userId } = c.req.valid("json");
    //         return c.json({});
    //     }
    // )

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes