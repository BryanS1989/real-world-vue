<script setup>
import { ref, onMounted } from 'vue';
import EventService from '@/services/EventService.js';
import EventCard from '@/components/EventCard.vue';

const events = ref(null);

onMounted(() => {
    /*
        We use MyJsonServer that allows to make fake requests:
            my-json-server.typicode.com/{GithubUserName}/{RepoName}
     */
    EventService.getEvents()
        .then((response) => {
            console.log('events: ', response.data);
            events.value = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
});
</script>

<template>
    <h1>Events For Good</h1>
    <div class="events">
        <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    </div>
</template>

<style scoped>
.events {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
