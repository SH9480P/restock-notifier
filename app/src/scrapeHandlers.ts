/// <reference lib="dom" />
import type { Browser, Page } from 'puppeteer-core'
import { sendEmail } from './sns.js'

export const milez_naver_handler = async (browser: Browser, page: Page) => {
    const selectors = {
        color: '.bd_2dy3Y > div:first-child > a',
        khakiColor: '.bd_2dy3Y > div:first-child > ul > li > a[data-shp-contents-id="카키"]',
        size: '.bd_2dy3Y > div:last-child > a',
        largeSize: '.bd_2dy3Y > div:last-child > ul > li > a[data-shp-contents-id="L"]',
    }

    const title = await page.title()
    console.log(title)

    const colorSelectorElement = await page.waitForSelector(selectors.color, { timeout: 5000 })
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
        console.log('product is available')
        const publishResult = await sendEmail()
        console.log(publishResult)
    }
}

export const milez__handler = async (browser: Browser, page: Page) => {
    const selector = '#product_option_id1 > optgroup'

    const title = await page.title()
    console.log(title)

    const optionGroupElement = await page.waitForSelector(selector, { timeout: 5000 })
    const optionTexts = await optionGroupElement?.$$eval('option', (elements) => elements.map((el) => el.textContent))

    if (optionTexts == null) {
        throw Error('No Option Elements')
    }

    for (const optionText of optionTexts) {
        if (optionText == null) {
            throw Error('No Option Text')
        }

        if (optionText.trim() === 'L') {
            console.log('product is available')
            const publishResult = await sendEmail()
            console.log(publishResult)
            return
        }
    }
}
