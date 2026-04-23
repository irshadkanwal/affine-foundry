export const formatDateTime = (dateTimeString) => {
  const dateObj = new Date(dateTimeString);
  if (isNaN(dateObj)) {
    return "- -";
  }
  const formattedTime = dateObj.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const formattedDate = dateObj.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const formattedDateWithDash = formattedDate.replace(/\//g, "-");

  return formattedTime + " " + formattedDateWithDash;
};

export const dateFormatChart = (dateObj, getYear = true) => {
  const givenDate = new Date(dateObj);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = months[givenDate.getMonth()];

  const day = getYear
    ? givenDate.getDate()
    : String(givenDate.getDate()).padStart(2, "0");
  const year = givenDate.getFullYear();

  return getYear ? `${monthName} ${day},${year}` : `${monthName} ${day}`;
};

export function formatDateForApi(inputDateString) {
  const inputDate = new Date(inputDateString);

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export const calculateDuration = (
  formattedDuration,
  isDurationFromHours = true
) => {
  const [hoursStr, minutesStr, secondsStr] = isDurationFromHours
    ? formattedDuration?.split(":")
    : [];

  const hours = isDurationFromHours
    ? parseInt(hoursStr, 10)
    : Math.floor(formattedDuration / 3600);
  const minutes = isDurationFromHours
    ? parseInt(minutesStr, 10)
    : Math.floor((formattedDuration % 3600) / 60);
  const seconds = isDurationFromHours
    ? parseInt(secondsStr, 10)
    : formattedDuration % 60;

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (seconds > 0 || (hours === 0 && minutes === 0)) {
    parts.push(`${seconds}s`);
  }

  return parts.join(" ");
};

export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return "- -";
  }
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}
