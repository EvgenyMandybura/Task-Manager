import ToastrService from "../services/ToastrService";
import { IS_INCORRECT_LOGGED_TIME } from "../constants/validationErrors";
import {
  MINUTES_IN_WEEK,
  MINUTES_IN_DAY,
  MINUTES_IN_HOUR,
} from "../constants/timeConstants";

export const stringToMinutes = (string) => {
  let arrWords = string.split(" ");
  let sum = 0;
  for (let i = 0; i < arrWords.length; i++) {
    if (arrWords[i].includes("w")) {
      sum += +arrWords[i].replace(/\D/g, "") * MINUTES_IN_WEEK;
    }
    if (arrWords[i].includes("d")) {
      sum += +arrWords[i].replace(/\D/g, "") * MINUTES_IN_DAY;
    }
    if (arrWords[i].includes("h")) {
      sum += +arrWords[i].replace(/\D/g, "") * MINUTES_IN_HOUR;
    }
    if (arrWords[i].includes("m")) {
      sum += +arrWords[i].replace(/\D/g, "");
    }
  }
  if (!(sum > 0)) {
    ToastrService.warn(IS_INCORRECT_LOGGED_TIME);
  }
  return sum;
};

export const minutesToString = (minutes) => {
  let timeString = "";
  let tempMinutes = minutes;
  let w = Math.trunc(tempMinutes / MINUTES_IN_WEEK);
  if (w >= 1) {
    timeString += w + "w ";
    tempMinutes = tempMinutes - w * MINUTES_IN_WEEK;
  }

  let d = Math.trunc(tempMinutes / MINUTES_IN_DAY);
  if (d >= 1) {
    timeString += d + "d ";
    tempMinutes = tempMinutes - d * MINUTES_IN_DAY;
  }

  let h = Math.trunc(tempMinutes / MINUTES_IN_HOUR);
  if (h >= 1) {
    timeString += h + "h ";
    tempMinutes = tempMinutes - h * MINUTES_IN_HOUR;
  }

  if (tempMinutes >= 1) {
    timeString += tempMinutes + "m ";
  }
  if (timeString == "") {
    timeString = 0;
  }
  return timeString;
};
