import puppeteer from 'puppeteer';

(async() => {
    const landing_page = 'https://splinterlands.com';
    const collection_page = landing_page + '?p=collection&a=';
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    const login = async () => {
        try {
            await page.setViewport({ width: 1366, height: 768});
            await page.goto(landing_page);
            await page.click('[id="log_in_button"]');
            await page.waitForTimeout(500);
            await page.type('[id="email"]', 'ryan.atanasoff+puppet@gmail.com');
            await page.type('[id="password"]', 'demo_p@ssw0rd');
            await page.click('button[type="submit"][name="loginBtn"][class="btn btn-primary btn-lg"]');
            await page.waitForNavigation();
        } catch(e) {
            console.log(e);
        }
    };
    const getCards = async () => {
        try {
            console.log("load cards");
            await page.goto(collection_page);
            await page.waitForNavigation();
            await page.waitForTimeout(1000);
            await page.click('button[type="button"][class="close"][aria-label="Close"]');

            return await page.evaluate(() => Array.from(document.querySelectorAll('.card-name-name'), element => element.innerText));
        } catch(e) {
            console.log(e);
        }
    };
    await login();
    const cards = await getCards();
    console.log(cards);
})();


