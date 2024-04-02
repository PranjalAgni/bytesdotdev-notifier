import { sqlite } from "https://esm.town/v/std/sqlite";

await sqlite.execute(`create table if not exists newsletter(
  id INTEGER PRIMARY KEY,
  article_number INTEGER unique,
  title text,
  date Date
)`);
