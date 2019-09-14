const minutesToHoursAndMinutes = minutes =>
  `${Math.floor(minutes / 60)}:${String(Math.floor(minutes % 60)).padStart(
    2,
    "0"
  )}`;

export const timeToNowInMinutes = (timestamp, now = new Date()) =>
  (timestamp - now) / 1000 / 60;

export const calculateActionEnd = (timestamp, minutesToAdd) =>
  new Date(timestamp).setMinutes(timestamp.getMinutes() + minutesToAdd);

export const getTimeDisplays = (
  timeRemainingInMinutes,
  timeToPeakInMinutes
) => {
  const timeRemaining =
    !timeRemainingInMinutes || timeRemainingInMinutes < 0
      ? null
      : minutesToHoursAndMinutes(timeRemainingInMinutes);
  const isAtPeak = Math.abs(timeToPeakInMinutes) < 10;
  const peakIsPast = timeToPeakInMinutes < 0;
  const timeToPeak = timeRemaining
    ? minutesToHoursAndMinutes(Math.abs(timeToPeakInMinutes))
    : null;
  return { timeRemaining, isAtPeak, peakIsPast, timeToPeak };
};
