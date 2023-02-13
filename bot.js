const chromium = require("chrome-aws-lambda");

const ListResultsServices = async ({ data }) => {
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium,
    executablePath,
    args: [
      "--no-sandbox",
      "--disable-web-security",
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
      "--disable-setuid-sandbox",
    ],
    headless: true,
  });

  let error = false;
  let result = [];
  let page;

  page = await browser.newPage();
  page.setCacheEnabled(false);

  await page.goto("https://cors-anywhere.herokuapp.com");

  const selector = await page.$(
    "body > form > p:nth-child(2) > input[type=submit]:nth-child(1)"
  );

  if (selector !== null) {
    await page.click(
      "body > form > p:nth-child(2) > input[type=submit]:nth-child(1)",
      { delay: 10, clickCount: 2 }
    );
  }

  await page.goto(data);

  await page
    .waitForSelector("._aagv")
    .then(() => {
      return (error = false);
    })
    .catch(() => {
      return (error = true);
    });
  result = await page.$$eval("._aagv > img", (images) =>
    images.map((i) => i.src)
  );

  await browser.close();

  return { result, error };
};

module.exports = ListResultsServices;
