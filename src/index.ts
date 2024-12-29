import dotenv from 'dotenv'
dotenv.config()

import { Crawler } from './crawler.js'
// import { sendEmail } from './sns.js'

export const handler = async () => {
    const crawlerOptions = {
        userAgent:
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        extraHTTPHeaders: {
            'Sec-Ch-Ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': 'Linux',
            'Upgrade-Insecure-Requests': '1',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            Priority: 'u=0, i',
        },
        url: 'https://smartstore.naver.com/milez/products/9141945916',
    }

    const crawler = new Crawler(crawlerOptions)

    await crawler.scrape(async (browser, page) => {
        const selectors = {
            color: '.bd_2dy3Y > div:first-child > a',
            khakiColor: '.bd_2dy3Y > div:first-child > ul > li > a[data-shp-contents-id="카키"]',
            size: '.bd_2dy3Y > div:last-child > a',
            largeSize: '.bd_2dy3Y > div:last-child > ul > li > a[data-shp-contents-id="L"]',
        }

        const title = await page.title()
        console.log(title)

        const colorSelectorElement = await page.waitForSelector(selectors.color, { timeout: 9000 })
        await colorSelectorElement?.click()

        const khakiColorSelectorElement = await page.waitForSelector(selectors.khakiColor, { timeout: 2000 })
        await khakiColorSelectorElement?.click()

        const sizeSelectorElement = await page.waitForSelector(selectors.size, { timeout: 2000 })
        await sizeSelectorElement?.click()

        const largeSizeSelectorElement = await page.waitForSelector(selectors.largeSize, { timeout: 2000 })
        const largeSizeText = await largeSizeSelectorElement?.evaluate((el) => el.textContent)

        if (largeSizeText == null) {
            throw Error('No Text in Large Option')
        }

        if (largeSizeText.trim() === 'L') {
            // const publishResult = await sendEmail()
            // console.log(publishResult)
            console.log('product is available')
        }
    })
}
