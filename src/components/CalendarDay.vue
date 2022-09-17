<template>
  <div class="card border-start" :class="cardClasses">
    <div class="card-header text-center" :class="cardHeaderClasses" role="button">
      <strong>{{ day.fullName }}</strong>
    </div>
    <div class="card-body">
      <!-- Anfang: Template für die Calendar-Event-Component -->
      <CalendarEvent v-for="event in day.events" :key="event.title" :event="event" :day="day">
        <template #eventPriority="slotProps"><h5>{{ slotProps.priorityDisplayName }}</h5></template>
        <template #default="{ event }"><i>{{ event.title }}</i></template>
      </CalendarEvent>
      <!-- Ende: Template für die Calendar-Event-Component -->
    </div>
  </div>
</template>

<script>
  import CalendarEvent from './CalendarEvent.vue';
  import Store from '../store';
  export default {
    name: "CalendarDay",
    components: {
      CalendarEvent,
    },
    props: {
      day: {
        type: Object,
        required: true,
        default() {
          return {
            id: -1,
            fullName: "Fehlender Wochentag",
            events: [],
          };
        },
        validator(value) {
          if (Object.keys(value).includes("id")) {
            return true;
          }
        },
      },
    },
    computed: {
      cardClasses() {
        return this.day.id === Store.getters.activeDay().id ? ["border-primary"] : null;
      },
      cardHeaderClasses() {
        return this.day.id === Store.getters.activeDay().id ? ["bg-primary", "text-white"] : null;
      },
    },
  };
</script>

<style scoped>

</style>