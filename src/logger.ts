import fs from 'fs'

const logFormat = (msg: string) => `${new Date()}\n${msg}\n\n`

export default {
    info: (msg: string) => {
        if (!fs.existsSync('log')) {
            fs.mkdirSync('log')
        }
        fs.writeFile('log/info.txt', logFormat(msg), { flag: 'a' }, (err) => {
            if (err) throw err
        })
    },
    error: (error: Error) => {
        if (!fs.existsSync('log')) {
            fs.mkdirSync('log')
        }
        fs.writeFile('log/error.txt', logFormat(error.stack ?? error.message), { flag: 'a' }, (err) => {
            if (err) throw err
        })
    },
}
