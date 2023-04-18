# Persona-UI

## 환경변수 설정 방법

### 환경에 맞게 환경변수 설정하기

> 자세한 환경변수 설정 방법은 [여기](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser)를 참고하면 된다.

프로젝트 내 루트에 있는 예시 파일인 `.env`를 로컬에서 구동할 수 있게 `.env.local`으로 복제하여 내용을 변경한다.

- 개발환경과 배포된 환경 모두 공통적으로 사용되는 변수의 경우 `.env.local`으로 관리한다.
- 개발환경의 경우 `.env.development.local`으로 복제하여 개발환경에서 구동되는 변수를 별도로 관리 및 기존 `.env`의 변수를 개발환경에 맞게 덮어 씌워 관리한다.
- 배포된 환경의 경우 `.env.production.local`으로 복제하여 배포된 환경에서 구동되는 변수를 별도로 관리 및 기존 `.env`의 변수를 배포된 환경에 맞게 덮어 씌워 관리한다.

### Next.js 내 클라이언트에서 환경변수 사용하기

Next.js는 기본적으로 Server-side에서 환경변수를 사용하는 것을 기본으로 하고 있어 클라이언트에서 사용할 경우 변수 이름 앞에 `NEXT_PUBLIC_<변수명>="값"` 형식으로 작성한다.  
예시로 `API_URL`을 클라이언트에서 사용하고 싶으면 `NEXT_PUBLIC_API_URL="http://localhost:4000"` 형식으로 작성해야지 클라이언트에서 인식한다.

## 🛠 Tech Stack

### Languages

- JavaScript
- TypeScript

### Web Graphics

- [x] React-Three-Fiber
- [x] React-Three-Cannon

### Web UI

- [x] React.js
- [x] TailwindCSS

### Real Time Connection

- [ ] Colyseus.js
- [ ] WebRTC (MediaSoup)

### Process Management

- [ ] PM2

## Conventional Commit

- [build]: 빌드 시스템, 외부 종속성에 영향을 주는 작업
- [ci]: ci 구성 파일, 스크립트 변경
- [docs] md와 같은 documentation의 변경
- [feat] 새로운 기능 추가
- [fix] 버그 수정
- [perf] 성능 개선 작업
- [refactor] 리팩토링 작업(코드 동작은 유지하되, 코드의 가독성과 유지보수성을 높이기 위해 내부구조 변경)
- [test] 테스트 코드 추가, 기존 테스트 수정
- [revert] 커밋 취소
- [chore] conrfig 파일 수정 등 기타 변경사항
