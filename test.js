var JsonCalendar = require("./");

test("exports a class", () => {
  var calendar = new JsonCalendar();
  expect(calendar instanceof JsonCalendar).toBe(true);
  expect(typeof calendar.state.year).toBe("number");
  expect(typeof calendar.state.monthIndex).toBe("number");
});

test("has today's date", () => {
  const today = new Date();
  const calendar = new JsonCalendar();
  const state = calendar.state;
  expect(state.today instanceof Date).toBe(true);
  expect(state.today.getFullYear()).toBe(today.getFullYear());
  expect(state.today.getHours()).toBe(0);
  expect(state.today.getMinutes()).toBe(0);
  expect(state.today.getHours()).toBe(0);
});

test("uses given today param", () => {
  var today = new Date(2018, 12, 31, 0, 0);
  var calendar = new JsonCalendar({ today });
  var state = calendar.state;
  expect(state.today instanceof Date).toBe(true);
  expect(state.today.getFullYear()).toBe(today.getFullYear());
  expect(state.today.getMonth()).toBe(today.getMonth());
  expect(state.today.getHours()).toBe(0);
  expect(state.today.getMinutes()).toBe(0);
  expect(state.today.getHours()).toBe(0);
});

test("has week arrays with 7 days", () => {
  const calendar = new JsonCalendar();
  const state = calendar.state;
  const lastWeekIndex = state.weeks.length - 1;
  expect(state.weeks[0].length).toBe(7);
  expect(state.weeks[lastWeekIndex].length).toBe(7);
  expect(typeof state.weeks[1][1].className).toBe("string");
});

test("displays October 2018 correctly", () => {
  var today = new Date(2018, 11, 1, 0, 0);
  var calendar = new JsonCalendar({ year: 2018, monthIndex: 9, today });
  var state = calendar.state;
  expect(state.weeks[0][0].day).toBe(30);
  expect(state.weeks[0][0].date.getMonth()).toBe(8);
  expect(state.weeks[0][1].day).toBe(1);
  expect(state.weeks[0][1].date.getMonth()).toBe(9);
});

test("add days to date", () => {
  const calendar = new JsonCalendar();
  const date = new Date(2018, 8, 29, 0, 0);
  expect(calendar.addDaysToDate(date, 0).getDate()).toBe(date.getDate());
  expect(calendar.addDaysToDate(date, -3).getDate()).toBe(26);
  expect(calendar.addDaysToDate(date, 10).getDate()).toBe(9);
});

test("creates a date without time", () => {
  var subject = new JsonCalendar();
  var date = subject.createDate(2018, 11, 32, 0, 0);
  expect(date instanceof Date).toBe(true);
  expect(date.getFullYear()).toBe(2019);
  expect(date.getMonth()).toBe(0);
  expect(date.getDate()).toBe(1);
  expect(date.getMinutes()).toBe(0);
  expect(date.getHours()).toBe(0);
});

test("get days in month", () => {
  var subject = new JsonCalendar();
  expect(subject.getDaysInMonth(2018, 4)).toBe(31);
  expect(subject.getDaysInMonth(2018, 8)).toBe(30);
  // non-leap year
  expect(subject.getDaysInMonth(2009, 1)).toBe(28);
  // leap year
  expect(subject.getDaysInMonth(2008, 1)).toBe(29);
});

test("accepts change of month", () => {
  const calendar = new JsonCalendar();
  calendar.createWeeksForMonth(0);
  expect(calendar.state.monthIndex).toBe(0);
  expect(calendar.state.year).toBe(new Date().getFullYear());
});

test("accepts change of month and year", () => {
  const calendar = new JsonCalendar();
  calendar.createWeeksForMonth(3, 2020);
  expect(calendar.state.monthIndex).toBe(3);
  expect(calendar.state.year).toBe(2020);
});
