<template>
    <div>
    <ul>
        <li v-for="recipe in recipes" :key="recipe.id">
            {{ recipe.name }}
        </li>
    </ul>
    </div>
</template>

<script>
    export default {
        props: {
            recipes: {
                type: Array
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>