<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const { event } = defineProps({
    event: {
        required: true,
    },
});

const router = useRouter();

const GStore = inject('GStore');

const register = () => {
    // If registration API calls is successful push back to the event details

    GStore.flashMessage = `You are successfully registered for ${event.title}`;
    setTimeout(() => {
        GStore.flashMessage = '';
    }, 3000);

    // Navigate the user to this location (Programmatic Navigation)
    router.push({
        name: 'event-details',
        id: event.id,
    });

    /*
        Other examples of Programmatic Navigation:

        // Path as string
        router.push('/about');

        // Path with an object
        router.push({ path: '/about' });

        // Named path
        router.push({ name: 'about' });

        // Dynamic segment
        router.push({ name: 'event-details', params: { id: 3 } });

        // Query parameter
        router.push({ name: 'event-list', query: { page: 2 } }); // Since event-list is at our root path this pushes to: /?page=2
    */

    /*
        To Navigate without pushing a history entry into the browser (disabling tha back button):

        router.replace({ name: 'event-details', params: { id: 3 } });

        this will replace the current page with the event-details page
    */

    /*
        You can programmatically invoke the browser back and forward buttons with:

        router.go(1);   --> Goes forward 
        router.go(-1);  --> Goes backward 
    */
};
</script>

<template>
    <p>Register for the event here!!!</p>
    <button @click="register">Register Me!</button>
</template>

<style scoped></style>
