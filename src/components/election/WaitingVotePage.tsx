"use client";
import Map from "@/components/feature/kakaoMap/Map";

import Header from "@/components/layout/Header";

import PopupMessage from "@/components/ui/PopupMessage";
import ShareButton from "@/components/ui/ShareButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSuggestedLocations } from "@/lib/api/ElectionApi";
import { useKakaoShare } from "@/lib/api/useKakaoShare";
import BlurredChevronHeader from "@/components/layout/BlurredChevronHeader";
import KakaoScript from "@/components/feature/KakaoScript";
import { useGroupSchedule } from "@/lib/api/scheduleApi";
import useAuthStore from "@/stores/authStores";
const WaitingVotePage = () => {
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);
  const { user } = useAuthStore();
  const userId = user?.id;
  const route = useRouter();
  const [noDepartLocationCount, setNoDepartLocationCount] = useState<
    number | null
  >(null);
  const params = useParams();
  const scheduleId = params.id as string;
  const { data: scheduleData, isPending } = useGroupSchedule(scheduleId);
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { shareWithTemplate } = useKakaoShare();
  const url = `https://localhost:3000/schedule/${scheduleId}/election/start-point`;
  const shareClickHandler = () => {
    shareWithTemplate(
      "내 출발 장소를 등록하고 모임 중간 장소를 찾아볼까요?",
      url
    );
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmOrLarger(window.innerWidth >= 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const fetchSuggestedLocations = async () => {
      try {
        const response = await getSuggestedLocations(scheduleId);
        setNoDepartLocationCount(response.data.noDepartLocationCount);
      } catch (error) {
        console.error("중간 장소 후보 조회 실패", error);
      }
    };
    if (scheduleId) {
      fetchSuggestedLocations();
    }
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [scheduleId]);

  useEffect(() => {
    if (isPending) return;
    if (!scheduleData?.data || !scheduleData.data.members || !userId) return;

    const myMemberInfo = scheduleData.data.members.find(
      (member: MemberType) => member.id === userId
    );

    if (
      myMemberInfo &&
      myMemberInfo.latitude != null &&
      myMemberInfo.longitude != null
    ) {
      setMyLocation({
        latitude: myMemberInfo.latitude,
        longitude: myMemberInfo.longitude,
      });
    }
  }, [scheduleData, userId, isPending]);

  return (
    <main className="flex flex-col h-screen w-full relative">
      <div className="hidden sm:block">
        <Header type="blue" />
      </div>
      {isSmOrLarger ? "" : <BlurredChevronHeader />}

      <div className="flex-1 w-full flex justify-center">
        <div className="w-full max-w-[1024px]">
          <Map
            latitude={myLocation?.latitude}
            longitude={myLocation?.longitude}
          />
        </div>
      </div>
      <div className="fixed bottom-9 left-0 right-0 w-full flex justify-center z-10">
        <div className="w-full max-w-[740px] mx-auto flex flex-col items-center gap-4 px-5">
          {noDepartLocationCount === 0 ? (
            <>
              <PopupMessage>
                출발지 위치 선택이
                <span className="text-[var(--color-primary-400)]"> 완료</span>
                되었어요!
              </PopupMessage>
              <ShareButton
                title="중간 장소 투표하러 가기"
                description="어느 역이 중간 지점인지 확인해보세요."
                mode="vote"
                onClick={() => {
                  route.push("../election");
                }}
              />
            </>
          ) : (
            <>
              <PopupMessage>
                <span className="text-[var(--color-primary-400)]">
                  {noDepartLocationCount}명
                </span>
                의 친구들이 아직 선택하지 않았어요.
              </PopupMessage>
              <ShareButton
                title="투표 링크 공유하기"
                description="빠르게 장소를 지정할 수 있도록 링크를 보내주세요"
                onClick={shareClickHandler}
              />
              <KakaoScript />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default WaitingVotePage;
