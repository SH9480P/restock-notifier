// TODO: 유령 의존성인지, 문제는 없는지 확인
import * as browsers from '@puppeteer/browsers'

export async function getExecutablePathFromCache() {
    const chromiumVersion = process.env.CHROMIUM_VERSION_REAL

    if (!chromiumVersion) {
        throw new Error('CHROMIUM_VERSION_REAL is not set')
    }

    // 설치된 브라우저 목록 가져오기
    const installedBrowsers = await browsers.getInstalledBrowsers({
        cacheDir: '.',
    })

    // 설치된 브라우저 목록에서 크롬 브라우저를 찾아서 실행 파일 경로를 가져오기
    let executablePath = installedBrowsers.find(
        (browser) => browser.browser === 'chrome' && browser.buildId === chromiumVersion
    )?.executablePath

    // 실행 파일 경로가 없으면 크롬 브라우저를 설치하기
    if (executablePath === undefined) {
        try {
            const chromium = await browsers.install({
                cacheDir: `${process.cwd()}`,
                browser: browsers.Browser.CHROME,
                buildId: chromiumVersion,
                installDeps: true,
            })
            executablePath = chromium.executablePath
        } catch (error) {
            console.error('Browser Installation Failed')
            throw error
        }
    }

    return executablePath
}
