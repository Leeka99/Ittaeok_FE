// 이벤트 생성 타입
interface EventType {
  title: string;
  description: string;
  meetingType: string;
  maxMember: number;
  groupId: null;
  dateList: {
    dates: date[];
    startTime: string;
    endTime: string;
  }[];
}

// 이벤트 조회 타입
interface EventInfoType {
  eventId: number;
  title: string;
  description: string;
  role: string;
}

// 전체 참여자 이벤트 조율 조회
interface EventScheduleInfoType {
  eventId: number;
  eventTitle: string;
  description: string;
  timeTable: EventTimeTableType;
  memberSchedules: EventTimeMemberType[];
  totalMembers: number;
  confirmedMembers: number;
}

// 이벤트 시간 테이블 타입
interface EventTimeTableType {
  dates: {
    date: string;
    dayOfWeek: string;
    displayDate: string;
  }[];
  startTime: string;
  endTime: string;
}

// 이벤트 멤버별 시간 타입
interface EventTimeMemberType {
  eventMemberId: string;
  memberName: string;
  dailyTimeSlots: {
    date: string;
    timeBit: string;
  }[];
  isConfirmed: boolean;
}

// 개인의 가능한 시간대 생성/수정
interface EventMyTimeType {
  dailyTimeSlots: {
    date: string;
    timeBit: string;
  }[];
  timezone: string;
}

interface DayInfo {
  day: string;
  date?: string;
  fullDate?: string;
}
