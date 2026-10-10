// Mock podaci za Home ekran (Sprint 1). Polja prate model podataka iz baze.

const minutesFromNow = (minutes: number) => new Date(Date.now() + minutes * 60_000);

export interface Hackathon {
  id: number;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

export interface LunchBreak {
  id: number;
  title: string;
  location: string;
  startTime: Date;
}

export interface CurrentSession {
  title: string;
  progress: number; // 0-100
}

export type AnnouncementType = 'important' | 'warning' | 'info';

export interface Announcement {
  id: number;
  title: string;
  message: string;
  type: AnnouncementType;
  createdAt: Date;
}

export const mockHackathon: Hackathon = {
  id: 1,
  name: 'Hackathon Live',
  location: 'GDG on Campus University of Belgrade',
  startDate: minutesFromNow(-9 * 60),
  endDate: minutesFromNow(14 * 60 + 32),
};

export const mockLunchBreak: LunchBreak = {
  id: 1,
  title: 'Lunch Break',
  location: 'Main Hall',
  startTime: minutesFromNow(15),
};

export const mockCurrentSession: CurrentSession = {
  title: 'Coding Sprint 1',
  progress: 85,
};

export const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: 'Important',
    message: 'Submission deadline extended by 30 minutes! New deadline is 5:30 PM.',
    type: 'important',
    createdAt: minutesFromNow(-2),
  },
  {
    id: 2,
    title: 'Update',
    message: 'Guest WiFi credentials have been reset. Check the info board.',
    type: 'warning',
    createdAt: minutesFromNow(-60),
  },
  {
    id: 3,
    title: 'Event',
    message: 'Mentoring session "Cloud Functions 101" starting in Room B.',
    type: 'info',
    createdAt: minutesFromNow(-120),
  },
];
