
export function updateTime() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Получаем день недели (0 — воскресенье, 1 — понедельник, ...)
  const dataDay = today.getDate();
  const dataMonth = today.getMonth() + 1;
  const dataYear = today.getFullYear();

  // Массив с названиями дней недели
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayName = daysOfWeek[dayOfWeek];

  document.getElementById("day-main").innerHTML = dayName;
  document.getElementById(
    "data-main"
  ).innerHTML = `${dataDay}/${dataMonth}/${dataYear}`;
}
