import cheerio from "npm:cheerio";

const NEWSLETTER_URL = "https://bytes.dev/archives";

function normalizeURL(url: string) {
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : "http://" + url;
}

async function fetchText(url: string, options?: any) {
  const response = await fetch(normalizeURL(url), {
    redirect: "follow",
    ...(options || {}),
  });

  return response.text();
}

export const webScrapeBytesNewsletter = async () => {
  const html = await fetchText(NEWSLETTER_URL);
  const $ = cheerio.load(html);
  const latestIssueSection = $("main > :nth-child(2)");
  const title = latestIssueSection
    .find("a")
    .children()
    .eq(1)
    .find("h3")
    .children()
    .eq(1)
    .text();

  const articleNumber = latestIssueSection
    .find("a")
    .children()
    .eq(1)
    .find("h3")
    .children()
    .eq(0)
    .text();

  const date = latestIssueSection
    .find("a")
    .children()
    .eq(1)
    .find("div > div > span")
    .text();

  return {
    id: Number(articleNumber.split(" ")[1]),
    title,
    date,
  };
};

webScrapeBytesNewsletter();
