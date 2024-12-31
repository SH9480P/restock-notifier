const { handler } = require('./dist/index')

handler().then((text) => console.log(text))
