export const Today = (today) => {
  const day = String(today.getDate()).padStart(2, "0");
  const year = String(today.getFullYear()).padStart(2, "0");

  let month = String(today.getMonth()).padStart(2, "0");
  if (month === "09") {
    month = "10";
  } else {
    let monthInInt = parseInt(month) + 1;
    month = month[0] + monthInInt.toString();
  }

  today = year + "-" + month + "-" + day;
  return today;
};
