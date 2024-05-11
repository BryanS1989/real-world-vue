<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import EventService from '@/services/EventService.js';
import EventCard from '@/components/EventCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps(['page']);

const events = ref(null);
const totalEvents = ref(0);

const page = computed(() => props.page);
const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalEvents.value / 2); // Find the total pages
    return page.value < totalPages; // Check if the page is not the last page
});

onMounted(() => {
    watchEffect(() => {
        events.value = null; // Clear out the events on the page

        /*
            We use MyJsonServer that allows to make fake requests:
            my-json-server.typicode.com/{GithubUserName}/{RepoName}
        */
        EventService.getEvents(2, page.value)
            .then((response) => {
                console.log('events: ', response.data);
                events.value = response.data;
                console.log('Total events: ', response.headers['x-total-count']);
                totalEvents.value = response.headers['x-total-count'];
            })
            .catch((error) => {
                console.log(error);
                router.push({ name: 'network-error' });
            });
    });
});
</script>

<template>
    <h1>Events For Good</h1>
    <div class="events">
        <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>

        <div class="pagination">
            <router-link
                id="page-prev"
                :to="{ name: 'event-list', query: { page: page - 1 } }"
                rel="prev"
                v-if="page != 1"
            >
                &#60; Previous
            </router-link>

            <router-link
                id="page-next"
                :to="{ name: 'event-list', query: { page: page + 1 } }"
                rel="next"
                v-if="hasNextPage"
            >
                Next &#62;
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.events {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.pagination {
    display: flex;
    width: 290px;
}
.pagination a {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
}

#page-prev {
    text-align: left;
}

#page-next {
    text-align: right;
}
</style>
