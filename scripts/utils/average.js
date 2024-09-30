import {times} from '../../data/times.js';

export function getTimeAverage() {
  let sumHours = 0;
  let sumMinutes = 0;
  let timeInputValuesQuantity = 0;

  times.forEach((item) => {
    if (item.time) {
      sumHours += Math.floor(item.time);
      sumMinutes += (item.time - Math.floor(item.time)) * 100;
      timeInputValuesQuantity++;
    }
  });

  const averageHours = sumHours / timeInputValuesQuantity;
  const minutesLeftFromHours = (averageHours - Math.floor(averageHours)) * 60;
  const averageMinutes = sumMinutes / timeInputValuesQuantity;

  let hours = Math.floor(averageHours);
  let minutes = Math.round(averageMinutes + minutesLeftFromHours);

  if (minutes >= 60) {
    hours++;
    minutes -= 60;
  }

  if (timeInputValuesQuantity === 0) {
    return '';
  }

  return `Average Time: ${hours}h:${formatTimeResult(minutes)}m`;
}

function formatTimeResult(minutes) {
  return minutes < 10 ? '0' + minutes : minutes;
}