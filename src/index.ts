import dotenv from 'dotenv'
dotenv.config()

import { randomInt } from 'crypto'
import { AsyncTask, CronJob, Task, ToadScheduler } from 'toad-scheduler'
import { Crawler } from '@src/crawler.js'
import logger from '@src/logger.js'
import { sendEmail } from '@src/sns.js'

const crawler = new Crawler({
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="124"',
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
    colorSelector: '.bd_2dy3Y > .bd_2jcZ-:first-child > .bd_1fhc9',
    khakiColorSelector: '.bd_2dy3Y > .bd_2jcZ-:first-child > ul > li > a[data-shp-contents-id="카키"]',
    sizeSelector: '.bd_2dy3Y > .bd_2jcZ-:last-child > .bd_1fhc9',
    largeSizeSelector: '.bd_2dy3Y > .bd_2jcZ-:last-child > ul > li > a[data-shp-contents-id="L"]',
    url: 'https://smartstore.naver.com/milez/products/9141945916',
})

let randomSecond = 30
let randomMinute = 30
let cronExpression = `${randomSecond} ${randomMinute} 8,10,12,14,16,18,20 * * *`

const scheduler = new ToadScheduler()

const inStockChecktask = new AsyncTask(
    'in-stock-checker',
    () => {
        return crawler
            .getKhakiLargeSizeData()
            .then((text) => {
                if (text === 'L') {
                    logger.info('IN STOCK!')
                    return sendEmail()
                } else {
                    logger.info(`Out of Stock... (${text})`)
                }
            })
            .then((response) => {
                if (response) {
                    if (response['$metadata'].httpStatusCode === 200) {
                        logger.info('Email Send Success')
                    } else {
                        logger.error(new Error('Email Send Failure / ' + JSON.stringify(response)))
                    }
                }
            })
    },
    (err) => {
        logger.error(err)
    }
)
let inStockCheckJob = new CronJob({ cronExpression }, inStockChecktask)
scheduler.addCronJob(inStockCheckJob)

const updateCronExprTask = new Task('update-cron-expression', () => {
    inStockCheckJob.stop()

    randomSecond = randomInt(60)
    randomMinute = randomInt(25, 35)
    cronExpression = `${randomSecond} ${randomMinute} 8,10,12,14,16,18,20 * * *`

    inStockCheckJob = new CronJob({ cronExpression }, inStockChecktask)
    inStockCheckJob.start()
})
const updateCronExprJob = new CronJob({ cronExpression: '0 0 9,11,13,15,17,19,21 * * *' }, updateCronExprTask)
scheduler.addCronJob(updateCronExprJob)

process.on('uncaughtException', (err) => {
    logger.error(err)
})
process.on('unhandledRejection', (err: Error) => {
    logger.error(err)
})
