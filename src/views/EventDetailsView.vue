<script setup>
import { ref, onMounted } from 'vue';
import EventService from '@/services/EventService.js';

const props = defineProps({
    id: {
        required: true,
    },
});
const event = ref(null);

onMounted(() => {
    /*
        fetch event (by id) and set local data
        i.e. https://my-json-server.typicode.com/BryanS1989/real-world-vue/events/123
        will return:
            {
                "id": 123,
                "category": "animal welfare",
                "title": "Cat Adoption Day",
                "description": "Find your new feline friend at this event.",
                "location": "Meow Town",
                "date": "January 28, 2022",
                "time": "12:00",
                "organizer": "Kat Laydee"
            }
    */
    EventService.getEvent(props.id)
        .then((response) => {
            console.log(`event with id(${props.id}): `, response.data);
            event.value = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
});
</script>

<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>

<style scoped></style>
