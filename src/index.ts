import dotenv from 'dotenv'
dotenv.config()

import { Scraper } from './scraper.js'
import { milez__handler, milez_naver_handler } from './scrapeHandlers.js'

export const handler = async () => {
    const scraperOptions = {
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
    }

    const scraper = new Scraper(scraperOptions)

    // 마일즈클라이밍 스마트스토어 와이드팬츠 카키 L
    // await scraper.scrape('https://smartstore.naver.com/milez/products/9141945916', milez_naver_handler)

    // 마일즈클라이밍 자사몰 라이트팬츠 차콜 L
    await scraper.scrape(
        'https://milez.kr/product/%EB%A7%88%EC%9D%BC%EC%A6%88-%EB%9D%BC%EC%9D%B4%ED%8A%B8-%ED%81%B4%EB%9D%BC%EC%9D%B4%EB%B0%8D-%ED%8C%AC%EC%B8%A0%EC%B0%A8%EC%BD%9C/18/category/27/display/1/',
        milez__handler
    )
}
