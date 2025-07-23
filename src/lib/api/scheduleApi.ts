import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import ToastWell from "@/components/ui/ToastWell";
import Toast from "@/components/ui/Toast";

interface CreateWorkSpaceRequest {
  workspace: WorkspacePlatformType;
  workspaceName: string;
  url: string;
}

interface UpdateScheduleInfoReqeust {
  description?: string;
  endTime?: string;
  eventId?: number;
  location?: string;
  meetingPlatform?: PlatformType;
  meetingType?: string;
  members?: string[];
  platformName?: string;
  platformUrl?: string | null;
  scheduleName?: string;
  scheduleStatus?: string;
  specificLatitude?: string;
  specificLocation?: string;
  specificLongitude?: string;
  startTime?: string;
  workspaces?: string[];
}

type PlatformType = "ZOOM" | "GOOGLE_MEET" | "DISCORD" | "ZEP" | "NONE";

const getGroupSchedule = async (scheduleId: string) => {
  const res = await axiosInstance.get(`/schedules/show/${scheduleId}`, {
    params: { id: scheduleId },
  });
  return res.data;
};

const createMeetingRoom = async (scheduleId: string) => {
  const res = await axiosInstance.post(
    `/schedules/create-online-meeting/${scheduleId}`
  );
  return res.data;
};

const createWorkspace = async (id: string, data: CreateWorkSpaceRequest) => {
  const res = await axiosInstance.post(`/schedules/add-workspace/${id}`, data);
  return res.data;
};

const deleteWorkspace = async (id: string, workspaceId: string) => {
  const res = await axiosInstance.post(
    `/schedules/delete-workspace/${id}`,
    workspaceId
  );
  return res.data;
};

const updateScheduleInfo = async (
  scheduleId: string,
  data: UpdateScheduleInfoReqeust
) => {
  const res = await axiosInstance.patch(
    `/schedules/modify/${scheduleId}`,
    data
  );
  return res.data;
};

export const useUpdateScheduleInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      scheduleId,
      data,
    }: {
      scheduleId: string;
      data: UpdateScheduleInfoReqeust;
    }) => updateScheduleInfo(scheduleId, data),
    onSuccess: (_, variables) => {
      ToastWell("✅", "일정 수정 완료!");
      queryClient.invalidateQueries({
        queryKey: ["groupSchedule", variables.scheduleId],
      });
    },
    onError: () => {
      Toast("앗, 일정 수정에 실패했어요");
    },
  });
};

export const useCreateMeetingRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (scheduleId: string) => createMeetingRoom(scheduleId),
    onSuccess: (_, scheduleId) => {
      ToastWell("🎉", "온라인 회의장을 생성해드렸어요!");
      queryClient.invalidateQueries({
        queryKey: ["groupSchedule", scheduleId],
      });
    },
    onError: () => {
      Toast("온라인 회의장 생성에 실패했어요");
    },
  });
};

export const useGroupSchedule = (scheduleId: string) => {
  return useQuery({
    queryKey: ["groupSchedule", scheduleId],
    queryFn: () => getGroupSchedule(scheduleId),
    enabled: !!scheduleId,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateWorkSpaceRequest }) =>
      createWorkspace(id, data),
    onSuccess: (data, variables) => {
      console.log("워크스페이스 등록 성공: ", data);
      queryClient.invalidateQueries({
        queryKey: ["groupSchedule", variables.id],
      });
    },
    onError: (err) => {
      console.error("워크스페이스 등록 실패: ", err);
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, workspaceId }: { id: string; workspaceId: string }) =>
      deleteWorkspace(id, workspaceId),
    onSuccess: (data, id) => {
      console.log("워크스페이스 삭제 성공: ", data);
      queryClient.invalidateQueries({
        queryKey: ["groupSchedule", id],
      });
    },
    onError: (err) => {
      console.error("워크스페이스 삭제 실패: ", err);
    },
  });
};

/**
 * 이벤트 등록
 * @param schedule 이벤트 정보
 * @returns
 */
export const createEvent = async (schedule: EventType) => {
  const response = await axiosInstance.post("/events", schedule);
  return response.data;
};

/**
 * 이벤트 상세 조회
 * @param eventId 이벤트 ID
 * @returns
 */
export const getEventDetail = async (eventId: number) => {
  const response = await axiosInstance.get(`/events/${eventId}`);
  return response.data;
};
export const useEventDetail = (eventId: number) => {
  return useQuery({
    queryKey: ["eventDetail", eventId],
    queryFn: () => getEventDetail(eventId),
    retry: 2,
    gcTime: 3 * 60 * 60 * 1000,
    staleTime: 3 * 60 * 60 * 1000,
  });
};

/**
 * 참여자 전원 이벤트 시간표 정보 조회
 * @param eventId 이벤트 ID
 * @returns
 */
const getEventScheduleInfo = async (
  eventId: number
): Promise<EventScheduleInfoType> => {
  const response = await axiosInstance.get(`/events/${eventId}/all-time`);
  return response.data.data;
};

export const useEventScheduleInfo = (eventId: number) => {
  return useQuery({
    queryKey: ["eventScheduleInfo", eventId],
    queryFn: () => getEventScheduleInfo(eventId),
    retry: 2,
    gcTime: 3 * 60 * 60 * 1000,
  });
};

/**
 * 개인의 가능한 시간대 생성/수정
 * @param eventId 이벤트 ID
 * @param time 개인의 가능한 시간대
 * @returns
 */
export const setEventMyTimeApi = async (
  eventId: number,
  time: EventMyTimeType
) => {
  const response = await axiosInstance.post(`/events/${eventId}/my-time`, time);
  return response.data;
};

/**
 * 개인의 이벤트 완료 처리
 * @param eventId 이벤트 ID
 * @returns
 */
export const setEventMyTime = async (eventId: number) => {
  const response = await axiosInstance.post(`/events/${eventId}/complete`);
  return response.data;
};

/**
 * 시간표 결과 설정
 * @param eventId 이벤트 ID
 * @returns
 */
export const setScheduleResult = async (eventId: number) => {
  const response = await axiosInstance.post(
    `/events/${eventId}/schedule-result`
  );
  return response.data;
};

/**
 * 시간표 결과 조회
 * @param eventId 이벤트 ID
 * @returns
 */
export const useScheduleResult = (eventId: number) => {
  return useQuery({
    queryKey: ["scheduleResult", eventId],
    queryFn: () => getScheduleResult(eventId),
    retry: 2,
    gcTime: 3 * 60 * 60 * 1000,
    staleTime: 3 * 60 * 60 * 1000,
  });
};

const getScheduleResult = async (eventId: number) => {
  const response = await axiosInstance.get(
    `/events/${eventId}/all-time/result`
  );
  return response.data;
};

/**
 * 이벤트 초대
 * @param eventId 이벤트 ID
 * @param groupId 그룹 ID
 * @returns
 */
export const setInviteEvent = async (eventId: number, groupId: number) => {
  const response = await axiosInstance.post(
    `/events/${eventId}/join/${groupId}`
  );
  return response.data;
};
