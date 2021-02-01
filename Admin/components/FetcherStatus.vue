<template>
  <div>
    <span>Index : {{ index }}</span>
    <span>Status : {{ status }}</span>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
    },
    status : String,
  },
};
</script>

<style lang="scss" scoped>
</style>