"use client";

import { Bubble } from "@/components/ui/Bubble";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import rabbit from "@/assets/images/rabbit_vote.png";
import { useParams, useRouter } from "next/navigation";
import { useGroupSchedule } from "@/lib/api/scheduleApi";
import Header from "@/components/layout/Header";

const StartVotePage = () => {
  const router = useRouter();
  const params = useParams();
  const scheduleId = params.id as string;
  const { data: schedule, isLoading } = useGroupSchedule(scheduleId);
  console.log(schedule);

  const clickHandler = () => {
    router.push(`/schedule/${scheduleId}/election/start-point`);
  };

  console.log(schedule);
  return (
    <main className="w-full">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="flex flex-col  min-h-screen relative pt-13 pb-32 max-w-[740px] mx-auto overflow-hidden">
        <div className="flex flex-col gap-2 px-10 pt-7.5 ">
          {isLoading ? (
            <div className="h-7 w-1/3 bg-[var(--color-gray-100)] rounded animate-pulse" />
          ) : (
            <h2 className="font-semibold text-2xl text-[var(--color-gray)]">
              {schedule?.data.scheduleName || "내 일정"}
            </h2>
          )}

          <h1 className="font-semibold text-2xl text-[var(--color-black)]">
            <span className="text-[var(--color-primary-400)]">중간 지점</span>{" "}
            찾으러 가기
          </h1>
        </div>
        <div className="flex-1 flex items-center justify-center ">
          <Image
            src={rabbit}
            alt="rabbit"
            width={438}
            height={438}
            className="mx-auto w-[438px] h-[438px] sm:w-[385px] sm:h-[385px] object-cover "
            sizes="(min-width: 768px) 385px, 438px"
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center absolute bottom-9  left-0 px-5 gap-4">
          <Bubble size="sm">우리의 중간 장소는 어디일까? 🧐</Bubble>
          <Button state="default" onClick={clickHandler}>
            중간 지점 찾기
          </Button>
        </div>
      </div>
    </main>
  );
};

export default StartVotePage;
