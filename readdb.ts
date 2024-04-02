import { sqlite } from "https://esm.town/v/std/sqlite";

console.log(await sqlite.execute(`select * from newsletter`));
