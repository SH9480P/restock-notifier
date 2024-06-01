import dotenv from 'dotenv'
dotenv.config()

import { Crawler } from '@src/crawler.js'
import { sendEmail } from '@src/sns.js'

export const handler = async () => {
    const crawler = new Crawler({
        userAgent:
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        extraHTTPHeaders: {
            'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="123"',
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
        colorSelector: '.bd_2dy3Y > div:first-child > a',
        khakiColorSelector: '.bd_2dy3Y > div:first-child > ul > li > a[data-shp-contents-id="카키"]',
        sizeSelector: '.bd_2dy3Y > div:last-child > a',
        largeSizeSelector: '.bd_2dy3Y > div:last-child > ul > li > a[data-shp-contents-id="L"]',
        url: 'https://smartstore.naver.com/milez/products/9141945916',
    })

    const text = await crawler.getKhakiLargeSizeData()
    if (text === 'L') {
        const publishResult = await sendEmail()
        console.log(publishResult)
    }
    return text
}
