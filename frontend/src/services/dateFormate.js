export const dformate = (date) => {
  let d = new Date();
  if (date !== "") d = new Date(date);

  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  let ans = [year, month, day].join("-");
  return ans;
};
