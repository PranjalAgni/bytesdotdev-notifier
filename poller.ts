import pushover from "https://esm.town/v/pranjaldotdev/pushover";
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

// check if newsletter id exists
async function checkNewsletterPresent(articleNumber: number) {
  const data = await sqlite.execute({
    sql: `SELECT EXISTS(SELECT 1 FROM newsletter WHERE article_number=:articleNumber)`,
    args: { articleNumber },
  });

  return data.rows.length === 1;
}

(async () => {
  try {
    const data = await webScrapeBytesNewsletter();
    const isPresent = await checkNewsletterPresent(data.id);
    if (!isPresent) {
      console.log(`Article ${data.id} already exists!!!`);
    } else {
      // insert and notify
      await insertRow(data.id, data.title, data.date);

      const response = await pushover({
        token: Deno.env.get("PO_API_TOKEN"),
        user: Deno.env.get("PO_USER_KEY"),
        title: `Latest bytes.dev newsletter dropped ${data.date}`,
        message: data.title,
        url: `https://bytes.dev/archives/${data.id}`,
      });
      console.log("Pushover status: ", response.status);
    }
  } catch (err) {
    console.error("Error scraping newsletter ", err);
  }
})();
