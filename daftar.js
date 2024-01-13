const fs = require('fs');
const puppeteer = require('puppeteer');

async function Daftar() {
    const dataBuffer = fs.readFileSync('jobListings.json');
    const data = JSON.parse(dataBuffer.toString());

    const chromeExecutablePath = 'C:\\Users\\RidwanTech\\AppData\\Local\\Google\\Chrome\\User Data';

    try {
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: chromeExecutablePath,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ['--profile-directory=Default']
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1080, height: 1024 });

        // Define the selectors here
        const buttonSelector = '#app > div > div._1q6sw320._16awye68e > div._1q6sw320._16awye69y._16awye69r._16awye68u._16awye68n > div > div > div:nth-child(2) > div > div > div:nth-child(5) > div > div > button';
        const buttonSelector2 = '#app > div > div._1q6sw320._16awye68e > div._1q6sw320._16awye69y._16awye69r._16awye68u._16awye68n > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div._1q6sw320._16awye6gu._16awye6gq > button';
        const buttonSelector3 = "#app > div > div._1q6sw320._16awye68e > div._1q6sw320._16awye69y._16awye69r._16awye68u._16awye68n > div > div > div:nth-child(2) > div > div > div:nth-child(6) > div > div._1q6sw320._16awye6gu._16awye6gq > button"
        const buttonSelector4 = "#app > div > div._1q6sw320._16awye68e > div._1q6sw320._16awye69y._16awye69r._16awye68u._16awye68n > div > div > div:nth-child(2) > div > div > div:nth-child(6) > div > div:nth-child(2) > div > div > div > button"
        for (let jobData of data) {
            if (jobData && jobData.Link) {
                console.log('Navigating to:', jobData.Link);
                const match = jobData.Link.match(/\/(\d+)?\?/);
                const jobId = match ? match[1] : null;
                try {
                    await page.setViewport({ width: 1080, height: 1024 });
                    await page.goto(`https://www.jobstreet.co.id/id/job/${jobId}/apply`, { waitUntil: 'load' });

                    await page.waitForSelector(buttonSelector, { visible: true });
                    await page.click(buttonSelector);

                    await page.waitForSelector(buttonSelector2, { visible: true });
                    await page.click(buttonSelector2);

                    await page.waitForSelector(buttonSelector3, { visible: true });
                    await page.click(buttonSelector3);

                    await page.waitForSelector(buttonSelector4, { visible: true });
                    await page.click(buttonSelector4);
                    console.log("Sukses");

                } catch (e) {
                    console.error('Failed to load:', jobData.Link, e);
                }
            }
        }

        // await browser.close();
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

Daftar();