# Codex GitHub 배포

이 프론트엔드 저장소는 Codex가 GitHub push 기반 배포를 직접 수행할 수 있도록 준비되어 있습니다.

## 검증

```powershell
npm run codex:verify
```

의존성 설치가 먼저 필요하면 `-- -Install`을 함께 사용합니다.

```powershell
npm run codex:verify -- -Install
```

## 커밋 및 push

```powershell
npm run codex:deploy -- -Message "chore: Codex GitHub 배포 자동화 환경 구성"
```

배포 스크립트는 프로덕션 빌드를 실행한 뒤, 전달받은 커밋 컨벤션 메시지로 모든 로컬 변경사항을 커밋하고 현재 브랜치를 GitHub에 push합니다. 연결된 Vercel 프로젝트는 GitHub push를 감지해 배포를 시작합니다.

같은 변경사항에 대해 이미 빌드를 실행한 경우에만 `-SkipVerify`를 사용합니다.
