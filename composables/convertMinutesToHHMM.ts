export const convertMinutesToHHMM = (minutes: number) => {
  var hours = Math.floor(minutes / 60);
  var remainingMinutes = minutes % 60;

  // Ensure that the hours and minutes are formatted with leading zeros if needed
  var formattedHours = hours < 10 ? "0" + hours : hours;
  var formattedMinutes =
    remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;

  return formattedHours + ":" + formattedMinutes;
};
