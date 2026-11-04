import type { ScheduleEvent } from './schedule';
import type { Announcement } from './announcements';

export interface Hackathon {
  id: number;
  name: string;
  description: string | null;
  location: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'finished';
}

export interface LunchBreak {
  id: number;
  title: string;
  description: string | null;
  location: string;
  startTime: Date;
  endTime: Date;
}

export interface HomeData {
  hackathon: Hackathon;
  upcomingEvent: ScheduleEvent | null;
  lunchBreak: LunchBreak | null;
  announcements: Announcement[];
}