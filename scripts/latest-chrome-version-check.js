#!/usr/bin/env node

// shell script로 변경하고 실행시간 차이 파악하기
fetch('https://versionhistory.googleapis.com/v1/chrome/platforms/linux/channels/stable/versions')
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
    })
    .then((res) => {
        const chromeVersion = res.versions[0].version
        console.log(chromeVersion.split('.')[0])
    })
