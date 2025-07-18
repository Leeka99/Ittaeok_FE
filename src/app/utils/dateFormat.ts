/**
 * 날짜 포맷팅
 * @param date 날짜
 * @returns 날짜 포맷팅
 */
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}` as unknown as number;
  }
  if (day < 10) {
    day = `0${day}` as unknown as number;
  }

  return `${year}-${month}-${day}`;
};

/**
 * 시간 포맷팅 1
 * @param date 시간
 * @returns 시간 포맷팅
 */
export const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};

/**
 * 시간 포맷팅 2
 * @param startTime 시간
 * @param endTime 시간
 * @returns 시간 포맷팅 00:00 - 00:00
 */
export const formatScheduleTimeOnly = (
  startTime: string,
  endTime: string
): string => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const startHour = String(startDate.getHours()).padStart(2, "0");
  const startMinute = String(startDate.getMinutes()).padStart(2, "0");
  const endHour = String(endDate.getHours()).padStart(2, "0");
  const endMinute = String(endDate.getMinutes()).padStart(2, "0");

  return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
};

/**
 * 요일 반환
 * @param date 날짜
 * @returns 요일 (한글)
 */
const getKoreanDay = (date: Date) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
};

/**
 * 일정 시간 문자열로 변환
 * @param startTime 시작 시간
 * @param endTime 종료 시간
 * @returns 예: 2025년 8월 9일 (금) 17:30 - 18:30
 */
export const formatSchedule = (startTime: string, endTime: string): string => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const dayOfWeek = getKoreanDay(startDate);

  const startHour = String(startDate.getHours()).padStart(2, "0");
  const startMinute = String(startDate.getMinutes()).padStart(2, "0");
  const endHour = String(endDate.getHours()).padStart(2, "0");
  const endMinute = String(endDate.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${startHour}:${startMinute} - ${endHour}:${endMinute}`;
};

/**
 * D-{DAY} 문자열로 변환
 * @param startTime 시작 시간
 * @returns 예: D-3, D+2, D-DAY
 */
export const getDDay = (startTime: string): string => {
  const today = new Date();
  const eventDate = new Date(startTime);

  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  const diff = Math.floor(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "D-DAY";
  return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
};
