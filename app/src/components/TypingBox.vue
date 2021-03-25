<template>
  <div v-if="typing" class="float-right w-3/5 my-2 message">
    <span class="inline-flex float-right px-6 py-4 text-gray-700 bg-gray-200 rounded-xl">
      <span class="block w-1 h-1 bg-gray-600 rounded-lg ml-0.5 point1"></span>
      <span class="block w-1 h-1 bg-gray-600 rounded-lg ml-0.5 point2"></span>
      <span class="block w-1 h-1 bg-gray-600 rounded-lg ml-0.5 point3"></span>
      <span class="block w-1 h-1 bg-gray-600 rounded-lg ml-0.5 point4"></span>
      <span class="block w-1 h-1 bg-gray-600 rounded-lg ml-0.5 point5"></span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["typing"]
}
</script>

<style lang="scss" scoped>
@for $i from 1 through 8 {
  .point#{$i} {
    animation-name: myanimation;
    animation-duration: 600ms;
    animation-iteration-count: infinite;
    animation-delay: $i * 200ms;
    position: relative;
  }
}


@keyframes myanimation {
  0% {
    top: 0px;
  }
  50% {
    top: 2px;
  }
  0% {
    top: 0px;
  }
}
</style>
