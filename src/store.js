import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";

const state = reactive({
  calendarWeekData,
  activeView: "CalendarWeek",
  activeOrdering: "title",
});

const getters = {
  activeDay: () => state.calendarWeekData.find((day) => day.active),
  events: (dayId) => {
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    return dayObj.events.sort((a, b) => {
      if (a[state.activeOrdering] > b[state.activeOrdering]) {
        return 1;
      } else if (a[state.activeOrdering] < b[state.activeOrdering]) {
        return -1;
      }
      return 0;
    });
  },
};

const mutations = {
  editEvent(dayId, eventTitle) {
    state.calendarWeekData.map((dayObj) => {
      dayObj.events.map((event) => (event.edit = false));
    });
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find((event) => event.title === eventTitle);
    eventObj.edit = true;
  },
  updateEvent(dayId, oldEventTitle, newEvent) {
    newEvent.title = newEvent.title !== "" ? newEvent.title : oldEventTitle;
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find(
      (event) => event.title === oldEventTitle
    );
    eventObj.title = newEvent.title;
    eventObj.priority = Number(newEvent.priority);
    eventObj.edit = false;
  },
  deleteEvent(dayId, eventTitle) {
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventIndex = dayObj.events.findIndex(
      (event) => event.title === eventTitle
    );
    dayObj.events.splice(eventIndex, 1);
  },
  setActiveDay(dayId) {
    state.calendarWeekData.map((dayObj) =>
      dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false)
    );
  },
  storeEvent(event) {
    const activeDay = getters.activeDay();
    activeDay.events.push({
      title: event.title,
      edit: false,
      color: event.color,
      priority: Number(event.priority),
    });
  },
  setActiveView(view) {
    state.activeView = view;
  },
  setActiveOrdering(ordering) {
    state.activeOrdering = ordering;
  },
};

export default {
  state: readonly(state),
  getters,
  mutations,
};
