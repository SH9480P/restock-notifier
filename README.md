# restock-notifier

네이버 스마트스토어에 재입고 알림 기능이 없어서 만들어 보았습니다.

24.06.10 기준, 클라이밍 바지 L 사이즈의 품절 여부를 조회합니다.

### 사용법

1. `npm run build && npm run deploy` 입력
2. `dist/archive.zip`파일을 AWS Lambda Function에 업로드
3. AWS Event Bridge로 실행 주기 설정
