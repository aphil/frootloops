<template>
    <div>
    <ul>
        <li v-for="flyer in flyers" :key="flyer.id">
            {{ flyer.name }}
            <img :src="flyer.imageUrl" />
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