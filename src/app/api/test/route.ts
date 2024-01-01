import 'server-only';
import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
  const dbUrl = process.env.DB_URL;
  try {
    if (!dbUrl) throw new Error("DB Url not found");
    const sql = neon(dbUrl);
    console.log("db connected!")

    const response = await sql`SELECT version()`;
    return Response.json(response)
  } catch (err) {
    console.log(err)
    return Response.json({msg: "err"})
  }
}
