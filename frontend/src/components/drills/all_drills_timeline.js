//all_drills_timeline.js
export const initialData = {
  earthquake: [
    {
      id: 1,
      title: "Earthquake Drill - Classroom A",
      startedAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
      completion_time: new Date(Date.now() + 1000 * 60 * 2).toISOString(),
      marked_safe: null,
    },
    {
      id: 2,
      title: "Earthquake Drill - Lab",
      startedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      completion_time: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
      marked_safe: null,
    },
  ],
  flood: [
    {
      id: 3,
      title: "Flood Evacuation - Ground Floor",
      startedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      completion_time: new Date(Date.now() + 1000 * 60 * 2).toISOString(),
      marked_safe: null,
    },
    {
      id: 4,
      title: "Flood Awareness Session",
      startedAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
      completion_time: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      marked_safe: null,
    },
  ],
  fire: [
    {
      id: 5,
      title: "Fire Exit Route Practice",
      startedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      completion_time: new Date(Date.now() + 1000 * 60 * 2).toISOString(),
      marked_safe: null,
    },
    {
      id: 6,
      title: "Fire Drill - Hostel Block",
      startedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      completion_time: new Date(Date.now() - 1000 * 60 * 60 * 71).toISOString(),
      marked_safe: null,
    },
  ],
};
