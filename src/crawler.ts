import puppeteer, { Browser, Page } from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { getExecutablePathFromCache } from './browserUtils.js'

interface CrawlerOption {
    userAgent: string
    extraHTTPHeaders: Record<string, string>
    url: string
}

export class Crawler {
    private readonly userAgent: string
    private readonly extraHTTPHeaders: Record<string, string>
    private readonly url: string

    constructor({ userAgent, extraHTTPHeaders, url }: CrawlerOption) {
        this.userAgent = userAgent
        this.extraHTTPHeaders = extraHTTPHeaders
        this.url = url
    }

    private async delay(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    private async openTargetPage() {
        const browser = await puppeteer.launch({
            args: process.env.NODE_ENV === 'development' ? ['--no-sandbox'] : chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath:
                process.env.NODE_ENV === 'development'
                    ? await getExecutablePathFromCache()
                    : await chromium.executablePath(),
            headless: process.env.NODE_ENV === 'development' ? false : chromium.headless,
        })

        const page = await browser.newPage()
        page.setUserAgent(this.userAgent)
        page.setExtraHTTPHeaders(this.extraHTTPHeaders)

        await page.goto(this.url)
        await page.setViewport({ width: 1080, height: 1024 })

        return { browser, page }
    }

    async scrape(callback: (browser: Browser, page: Page) => void | Promise<void>) {
        const { browser, page } = await this.openTargetPage()
        await callback(browser, page)
        await Promise.race([browser.close(), browser.close(), browser.close()])
    }
}
