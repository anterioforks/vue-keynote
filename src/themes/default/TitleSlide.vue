<template>
<Slide class="slide-title">
  <Fit>
    <Title>{{ title }}</Title>
  </Fit>
  <Subtitle>
    <slot>{{ subtitle }}</slot>
  </Subtitle>
</Slide>
</template>

<script>
export default {
  name: 'TitleSlide',
  keynote: 'slide',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    }
  }
}
</script>


<style lang="scss">
@import './variables';
.slide.slide-title {
  align-items: center;
  justify-content: center;
  text-align: center;
  .title {
    color: $primary-color;
  }
  .subtitle {
    color: $secondary-color;
  }
}
</style>
