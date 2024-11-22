export const commentDate = (d: string) => {
  const inputDate: any = new Date(d);
  const currentDate: any = new Date();

  const timeDifference = currentDate - inputDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  let output;

  if (seconds < 60) {
    output = `${seconds} soniya`;
  } else if (minutes < 60) {
    output = `${minutes} daqiqa`;
  } else if (hours < 24) {
    output = `${hours} soat`;
  } else if (days < 30) {
    output = `${days} kun`;
  } else if (months < 12) {
    output = `${months} oy`;
  } else {
    output = `${years} yil`;
  }
  if (d) {
    return output;
  }
};
