import { neon } from "@neondatabase/serverless";
import {config} from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import {migrate} from "drizzle-orm/neon-http/migrator"

config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not defined in env.local");
    console.log("not found");
    process.exit(1);
}

    // Connect to the database using neon
    const sql = neon(process.env.DATABASE_URL);

    // Initialize drizzle with the database connection
    const db = drizzle(sql);

const main = async () => {
    try{
        await migrate(db , {migrationsFolder: "drizzle"});
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

main();