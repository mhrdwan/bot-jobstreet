const puppeteer = require('puppeteer');
const fs = require('fs');
const Daftar = require('./daftar');
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto('https://www.jobstreet.co.id/id/gudang-admin-jobs', { waitUntil: 'networkidle2' });

    const parentClassSelector = '._1wkzzau0.szurmz0.szurmz4';

    await page.waitForSelector(parentClassSelector);

    const jobListings = await page.$$eval(parentClassSelector, (elements) =>
        elements.map((el) => {
            const childElement = el.querySelector('a._1wkzzau0._1wkzzauf.uo6mkd');
            const namaPT = el.querySelector('a._1wkzzau0._1wkzzauf._1wkzzau0._1wkzzauf._842p0a0._842p0a1 ');
            return childElement ? {
                PT: namaPT ? namaPT.textContent.trim() : null,
                Job: childElement.textContent.trim(),
                Link: 'https://www.jobstreet.co.id' + childElement.getAttribute('href'),
            } : null;
        }).filter(item => item !== null)
    );

    fs.writeFile('jobListings.json', JSON.stringify(jobListings, null, 2), err => {
        if (err) {
            console.error('Error writing file', err);
        } else {
            console.log('Successfully wrote job listings to jobListings.json');
        }
    });
    console.log('sukses')
    await browser.close();
    console.log(`Menjalankan function daftar`);
    await Daftar()
})();
