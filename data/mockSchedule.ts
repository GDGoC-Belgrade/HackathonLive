export interface ScheduleEvent {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  description?: string;
  type?: 'blue' | 'yellow' | 'red' | 'green';
}

export const mockEvents: ScheduleEvent[] = [
  {
    id: 1,
    title: "Keynote Address",
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    location: "Main Hall",
    type: "blue"
  },
  {
    id: 2,
    title: "Lunch Break",
    startTime: "12:30 PM",
    endTime: "1:30 PM",
    location: "Cafeteria",
    type: "yellow"
  },
  {
    id: 3,
    title: "Workshop: Cloud Functions 101",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    location: "Room B",
    type: "red"
  },
  {
    id: 4,
    title: "Final Pitches & Demos",
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    location: "Theater",
    type: "green"
  }
];