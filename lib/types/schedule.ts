export type ScheduleEventType = "ceremony" | "workshop" | "meal" | "deadline" | "other";

export interface ScheduleEvent {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  description?: string;
  type: ScheduleEventType;
}