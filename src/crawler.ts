import puppeteer, { Browser, Page } from 'puppeteer'

interface CrawlerOption {
    userAgent: string
    extraHTTPHeaders: Record<string, string>
    url: string
    colorSelector: string
    khakiColorSelector: string
    sizeSelector: string
    largeSizeSelector: string
}

export class Crawler {
    private readonly userAgent: string
    private readonly extraHTTPHeaders: Record<string, string>
    private readonly url: string
    private readonly colorSelector: string
    private readonly khakiColorSelector: string
    private readonly sizeSelector: string
    private readonly largeSizeSelector: string

    browser!: Browser
    page!: Page

    constructor({
        userAgent,
        extraHTTPHeaders,
        url,
        colorSelector,
        khakiColorSelector,
        sizeSelector,
        largeSizeSelector,
    }: CrawlerOption) {
        this.userAgent = userAgent
        this.extraHTTPHeaders = extraHTTPHeaders
        this.url = url
        this.colorSelector = colorSelector
        this.khakiColorSelector = khakiColorSelector
        this.sizeSelector = sizeSelector
        this.largeSizeSelector = largeSizeSelector
    }

    private async delay(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    private async accessTargetPage() {
        this.browser = await puppeteer.launch()
        this.page = await this.browser.newPage()
        this.page.setUserAgent(this.userAgent)
        this.page.setExtraHTTPHeaders(this.extraHTTPHeaders)

        await this.page.goto(this.url)
        await this.page.setViewport({ width: 1080, height: 1024 })
    }

    async getKhakiLargeSizeData() {
        await this.accessTargetPage()
        await this.delay(3000)

        const colorSelectorElement = await this.page.waitForSelector(this.colorSelector, { timeout: 5000 })
        await colorSelectorElement?.click()
        await this.delay(2000)

        const khakiColorSelectorElement = await this.page.waitForSelector(this.khakiColorSelector, { timeout: 5000 })
        await khakiColorSelectorElement?.click()
        await this.delay(2000)

        const sizeSelectorElement = await this.page.waitForSelector(this.sizeSelector, { timeout: 5000 })
        await sizeSelectorElement?.click()
        await this.delay(2000)

        const largeSizeSelectorElement = await this.page.waitForSelector(this.largeSizeSelector, { timeout: 5000 })
        const largeSizeText = await largeSizeSelectorElement?.evaluate((el) => el.textContent)

        await this.browser.close()

        if (largeSizeText == null) {
            throw Error('No Text in Large Option')
        }
        return largeSizeText.trim()
    }
}
