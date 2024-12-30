import { handler } from './index'

handler().catch((error) => {
    console.error(error)
    process.exit(1)
})
