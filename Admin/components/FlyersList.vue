<template>
    <div>
    <ul>
        <li v-for="flyer in flyers" :key="flyer.id">
            {{ flyer.name }}
        </li>
    </ul>
    </div>
</template>

<script>
    export default {
        props: {
            flyers: {
                type: Array
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>