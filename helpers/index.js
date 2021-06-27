import moment from "moment";

export function setRandomColor() {
  let rgb = [];
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(Math.random() * 151 + 105);
  }
  let randomCol = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  console.log(randomCol);
  return randomCol;
}

export function timestampToDate(timestamp) {
  var date = new Date(timestamp * 1000);
  var formattedTime = moment(date).format("MMMM Do YYYY, h:mm ");
  return formattedTime;
}

export const workoutImages = {
  exercise: {
    Run: require("../assets/Run.jpeg"),
    Boxing: require("../assets/boxing.jpeg"),
    Pilates: require("../assets/Pilates.jpeg"),
  },
};

export const deleteFromArray = (array, item) => {
  const data = [...array];
  const index = array.indexOf(item);
  data.splice(index, 1);
  return data;
};

export const concatWithoutDupe = (arr, inputArr) => {
  return arr.length === 0 ? inputArr : arr.concat(inputArr.filter((item) => !arr.includes(item)));
};

export const getCurrWeek = () => {
  const curr = new Date();
  const first = curr.getDate() - curr.getDay();
  const last = first + 7;
  const start = new Date(curr.setDate(first));
  const end = new Date(curr.setDate(last));
  return { start, end };
};

export const getCurrMonth = () => {
  const date = new Date();
  const start = new Date(date.getFullYear(), date.getMonth(), 1, 8);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1, 7, 59, 59);
  return { start, end };
};

export const changeMonth = (month, direction) => {
  let start;
  if (direction === "next") {
    start = moment(month.start).add(1, "month").toDate();
  } else {
    start = moment(month.start).subtract(1, "month").toDate();
  }
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

  return { start, end };
};

export const changeWeek = (week, direction) => {
  if (direction === "next") {
    return {
      start: moment(week.start).add(1, "week").toDate(),
      end: moment(week.end).add(1, "week").toDate(),
    };
  } else {
    return {
      start: moment(week.start).subtract(1, "week").toDate(),
      end: moment(week.end).subtract(1, "week").toDate(),
    };
  }
};

export const getStats = (arr) => {
  const temp = arr.reduce(
    (x, y) => ({
      calories: x.calories + y.calories,
      duration: x.duration + y.duration,
      distance: x.distance + y.distance,
    }),
    {
      calories: 0,
      duration: 0,
      distance: 0,
    }
  );
  temp.sets = arr
    .map((workout) =>
      workout.exercises
        .map((exercise) => exercise.sets.length)
        .reduce((x, y) => x + y, 0)
    )
    .reduce((x, y) => x + y, 0);
  temp.workouts = arr.length;
  temp.categories = getSetsByCat(arr);
  return temp;
};

export const yearlyData = (hist) => {
  let months = [];
  for (let i = 0; i < 12; i++) {
    months.push(i);
  }

  const DataPerMonth = months.map(
    (month) =>
      hist.filter(
        (workout) => new Date(workout.date.seconds * 1000).getMonth() === month
      ).length
  );
  return DataPerMonth;
};
const findMax = (arr) => {
  return arr.reduce((x, y) => Math.max(x, y), 0);
};

export const statsByEx = (exercise, hist) => {
  const workoutsWithEx = hist.filter(workout => workout.exercises.find((ex) => ex.data.name === exercise.data.name))
  if (workoutsWithEx.length === 0) {
    return {
      exStats: 0
    }
  }
  const res = workoutsWithEx
    .map((workout) => ({
      date: workout.date.seconds * 1000,
      exStats: workout.exercises
        .filter((ex) => ex.data.name === exercise.data.name)
        .map((ex) => ex.sets.length)
        .reduce((x, y) => x + y, 0),
    }))
    .reduce(
      (x, y) => ({
        date: Math.max(x.date, y.date),
        exStats: x.exStats + y.exStats,
      }),
      { date: Date.parse(new Date("2014-04-03")), exStats: 0 }
    );
    
  const exHist = hist.filter(workout => workout.exercises.find((ex) => ex.data.name === exercise.data.name)).map((workout) => ({
    date: workout.date,
    exs: findMax(
      workout.exercises
        .filter((ex) => ex.data.name === exercise.data.name)
        .map((ex) => findMax(ex.sets.map((set) => set.weight)))
    ),
  }));
  return { ...res, exHist: exHist };
};

export const monthlyData = (hist, month) => {
  const thisMonth = month.start.getMonth();
  const weeksThisMonth = [];
  let curr = getWeek(month.start);

  while (curr.end.getMonth() === thisMonth) {
    weeksThisMonth.push(curr);
    curr = changeWeek(curr, "next");
  }
  weeksThisMonth.push(curr);
  return weeksThisMonth.map((week) => ({
    week: week,
    count: hist.filter(
      (doc) =>
        doc.date.seconds * 1000 <= Date.parse(week.end) &&
        doc.date.seconds * 1000 >= Date.parse(week.start)
    ).length,
  }));
};

export const getSetsByCat = (hist) => {
  const setsByCat = [];
  for (let i = 8; i < 15; i++) {
    setsByCat.push({ id: i, sets: 0 });
  }

  const colors = [
    "gold",
    "crimson",
    "purple",
    "lightblue",
    "limegreen",
    "lightpink",
    "darkorange",
  ];

  hist.forEach((workout) =>
    workout.exercises.forEach(
      (ex) =>
        (setsByCat.find((cat) => cat.id === ex.data.category).sets +=
          ex.sets.length)
    )
  );

  return setsByCat.map((cat, index) => ({
    ...cat,
    id: getCat(cat.id),
    color: colors[index],
  }));
};

export const favExercises = (hist) => {
  const favs = [];
  hist.forEach((workout) =>
    workout.exercises.forEach((ex) => {
      const favEx = favs.find((fav) => ex.data.name === fav.name);
      favEx
        ? (favEx.count += 1)
        : favs.push({
            name: ex.data.name,
            imgURL: ex.data?.photo ? ex.data.photo : "",
            count: 1,
          });
    })
  );

  return favs.sort((x, y) => y.count - x.count).slice(0, 3);
};

export const reloadPeriod = (period, hist) => {
  return getStats(
    hist
      .map((doc) => doc.data)
      .filter(
        (doc) =>
          doc.date.seconds * 1000 < Date.parse(period.end) &&
          doc.date.seconds * 1000 >= Date.parse(period.start)
      )
  );
};

export const getCat = (cat) => {
  switch (cat) {
    case 8:
      return "Arms";
    case 9:
      return "Legs";
    case 10:
      return "Abs";
    case 11:
      return "Chest";
    case 12:
      return "Back";
    case 13:
      return "Shoulders";
    case 14:
      return "Calves";
  }
  exCats.find((item) => item.id === cat);
  console.log(cat);
};

const getWeek = (date) => {
  const curr1 = new Date(date.getTime());
  const curr2 = new Date(date.getTime());
  const first = date.getDate() - date.getDay();
  const last = first + 7;
  const start = new Date(curr1.setDate(first));
  const end = new Date(curr2.setDate(last));
  return { start, end };
};
