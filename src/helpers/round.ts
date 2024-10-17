export default function roundToNearestHour(date: Date) {
  date.setMinutes(0, 0, 0);
  return date;
}
