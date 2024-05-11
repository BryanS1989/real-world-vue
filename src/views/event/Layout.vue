<script setup>
import { ref, onMounted, computed } from 'vue';
import EventService from '@/services/EventService.js';

const props = defineProps({
    id: {
        required: true,
    },
});

const event = ref(null);
const id = computed(() => props.id);

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
    EventService.getEvent(id.value)
        .then((response) => {
            console.log(`event with id(${id.value}): `, response.data);
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

        <nav>
            <!-- 
                We do not pass param id (params: {id}) since :id is required for 
                each child path: if :id is not sent in, vue router will look and
                use the :id param that is present 
            -->
            <!-- /event/2 -->
            <router-link :to="{ name: 'event-details' }">Details</router-link>
            |
            <!-- /event/2/register -->
            <router-link :to="{ name: 'event-register' }">Register</router-link>
            |
            <!-- /event/2/edit -->
            <router-link :to="{ name: 'event-edit' }">Edit</router-link>
        </nav>

        <router-view :event="event"></router-view>
    </div>
</template>

<style scoped></style>
