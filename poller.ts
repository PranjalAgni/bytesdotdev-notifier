import { webScrapeBytesNewsletter } from "https://esm.town/v/pranjaldotdev/scraper";
import { sqlite } from "https://esm.town/v/std/sqlite";

// formats date in SQLITE format YYYY-MM-DD
function formatDate(date: string) {
  let [month, day, year] = date.split("/");
  if (month.length == 1) month = "0" + month;
  if (day.length == 1) day = "0" + day;
  return `${year}-${month}-${day}`;
}

// insert newsletter metadata in sqlite
async function insertRow(articleNumber: number, title: string, date: string) {
  try {
    await sqlite.execute({
      sql: `insert into newsletter(article_number, title, date) values (:articleNumber, :title, :date)`,
      args: { articleNumber, title, date: formatDate(date) },
    });
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  try {
    const data = await webScrapeBytesNewsletter();
    await insertRow(data.id, data.title, data.date);
  } catch (err) {
    console.error("Error scraping newsletter ", err);
  }
})();
