import postgres from "postgres";
import { nanoid } from "nanoid";

const sql = postgres(); // will use psql environment variables

type User = {
  id: string;
  username: string;
  password_hash: string;
};

// Create table if it doesn't exist
(async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(21) PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL
    )
  `;
})();

export const db = {
  user: {
    async create({ data }: { data: { username: string; password_hash: string } }) {
      const id = nanoid();
      const [user] = await sql<User[]>`
        INSERT INTO users (id, username, password_hash) 
        VALUES (${id}, ${data.username}, ${data.password_hash}) 
        RETURNING *
      `;
      return user;
    },
    async findUnique({ where: { username = undefined, id = undefined } }: { where: { username?: string; id?: string } }) {
      let user: User | undefined;
      if (id !== undefined) {
        [user] = await sql<User[]>`
          SELECT * FROM users 
          WHERE id = ${id}
        `;
      } else if (username !== undefined) {
        [user] = await sql<User[]>`
          SELECT * FROM users 
          WHERE username = ${username}
        `;
      }
      return user;
    }
  }
};
export default sql
