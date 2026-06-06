# 프로젝트 구조 문서

이 문서는 현재 `Ittaeok_FE` 프로젝트의 주요 디렉터리 및 파일 구조를 정리한 문서입니다.

## 루트 구조

- `.env.local`
- `.git/`
- `.github/`
- `.gitignore`
- `.idea/`
- `.next/`
- `components.json`
- `eslint.config.mjs`
- `next-env.d.ts`
- `next.config.ts`
- `node_modules/`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `public/`
- `README.md`
- `server.js`
- `src/`
- `tsconfig.json`

## `public/`

- `fonts/`
- `` (기타 정적 자산)

## `src/`

- `app/`
- `assets/`
- `components/`
- `lib/`
- `middleware.ts`
- `providers/`
- `stores/`
- `svg.d.ts`
- `types/`

## `src/app/`

- `auth/`
  - `callback/`
  - `login/`
- `favicon.ico`
- `globals.css`
- `group/`
- `layout.tsx`
- `loading.tsx`
- `meeting/`
- `mypage/`
- `not-found.tsx`
- `page.tsx`
- `README.md`
- `schedule/`
- `utils/`

## `src/components/`

- `auth/`
  - `README.md`
  - `callback/`
  - `login/`
- `dashboard/`
  - `Banner.tsx`
  - `Dashboard.tsx`
  - `EmptyUserScheduleList.tsx`
  - `LoadUserSchedule.tsx`
  - `LoadUserScheduleList.tsx`
  - `MyGroupItem.tsx`
  - `MyGroupSection.tsx`
  - `MyScheduleItem.tsx`
  - `MyScheduleSection.tsx`
  - `Skeleton.tsx`
  - `UserSchedule.tsx`
  - `UserScheduleList.tsx`
- `election/`
  - `CreateDepartLocationPage.tsx`
  - `ShowMiddleLocationPage.tsx`
  - `StartVotePage.tsx`
  - `VoteMiddleLocationPage.tsx`
  - `WaitingVotePage.tsx`
- `feature/`
  - `CommonSchedule.tsx`
  - `KakaoScript.tsx`
  - `MeetingInfo.tsx`
  - `MeetingLocation.tsx`
  - `OnlineMeetingRoom.tsx`
  - `README.md`
  - `Schedule.tsx`
  - `WorkSpace.tsx`
  - `calendar/`
  - `group/`
  - `kakaoMap/`
  - `meeting/`
  - `schedule/`
- `home/`
  - `Home.tsx`
- `landing/`
  - `Landing.tsx`
  - `MainLogo.tsx`
  - `MvpCard.tsx`
  - `Section1.tsx`
  - `Section2.tsx`
  - `Section3.tsx`
  - `Section4.tsx`
  - `Section5.tsx`
  - `Section6.tsx`
  - `SectionLayout.tsx`
  - `TextMessage.tsx`
- `layout/`
  - `BlurredChevronHeader.tsx`
  - `BottomSheetHeader.tsx`
  - `Footer.tsx`
  - `GroupHeader.tsx`
  - `GroupHeaderContent.tsx`
  - `GroupHeaderMap.tsx`
  - `GroupHeaderTop.tsx`
  - `...`
- `mypage/`
- `ui/`

## `src/lib/`

- `api/`
- `profileImages.ts`
- `utils.ts`

## `src/providers/`

- `TanstackProvider.tsx`

## `src/stores/`

- `authStores.ts`

## `src/types/`

- `group.d.ts`
- `kakao.d.ts`
- `kakaoSearch.ts`
- `README.md`
- `schedule.d.ts`
- `station.d.ts`
