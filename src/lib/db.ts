import postgres from "postgres";

export const db = postgres(); // will use psql environment variables

(async () => {
  await db`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT NOT NULL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `;
  await db`
  CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;
})();

export interface DatabaseUser {
  id: string;
  username: string;
  password: string;
}
