import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";
import moment from "moment";

const state = reactive({
  calendarWeekData,
});

const getters = {
  activeDay: () =>
    state.calendarWeekData.find(
      (day) => day.fullName === moment().locale("de").format("dddd")
    ),
};

const mutations = {};

export default {
  state: readonly(state),
  getters,
  mutations,
};
