"use client";

import ActionButtons from "@/components/feature/schedule/editSchedule/ActionButtons";
import ScheduleForm from "@/components/feature/schedule/editSchedule/ScheduleForm";
import TimeEditBottomSheet from "@/components/feature/schedule/editSchedule/TimeEditBottomSheet";
import { useEditSchedule } from "@/components/feature/schedule/hooks/useEditSchedule";
import Header from "@/components/layout/Header";
import HeaderTop from "@/components/layout/HeaderTop";
import { useParams } from "next/navigation";

const EditScheduleInfo = () => {
  const params = useParams();
  const id = params.id as string;

  const {
    scheduleName,
    scheduleDescription,
    isOpen,
    selectedDate,
    scheduleTime,
    meetingType,
    setIsOpen,
    setSelectedDate,
    handleScheduleNameChange,
    handleScheduleDescriptionChange,
    handleTimeClick,
    handleEditComplete,
    handleDelete,
    setStartTime,
    setEndTime,
  } = useEditSchedule(id);

  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="min-w-[375px] w-full max-w-185 mx-auto pt-25 sm:pt-40 px-5 min-h-screen relative">
        <HeaderTop>일정 정보 수정</HeaderTop>

        <ScheduleForm
          scheduleName={scheduleName}
          scheduleDescription={scheduleDescription}
          scheduleTime={scheduleTime}
          meetingType={meetingType}
          onScheduleNameChange={handleScheduleNameChange}
          onScheduleDescriptionChange={handleScheduleDescriptionChange}
          onTimeClick={handleTimeClick}
        />

        <TimeEditBottomSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onComplete={handleEditComplete}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />

        <ActionButtons
          onDelete={handleDelete}
          onEditComplete={handleEditComplete}
        />
      </div>
    </div>
  );
};

export default EditScheduleInfo;
