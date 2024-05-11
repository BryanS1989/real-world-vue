<template>
    <div class="network-error">
        <h1>Uh-oh!</h1>

        <h3>
            It looks like you're experiencing some network issues, please take a breathe and
            <a hrf="#" @click="$router.go(-1)">click here</a> to try again.
        </h3>
    </div>
</template>
