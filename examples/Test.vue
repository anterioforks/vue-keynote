<template>
  <div class="wrapper">
    <transition name="slide-fade">
      <component :is="name"/>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({ name: 'foo' }),

  components: {
    foo: { render: (h) => h('div', 'foo') },
    bar: { render: (h) => h('div', 'bar') }
  },

  mounted () {
    setInterval(() => {
      this.name = this.name === 'foo' ? 'bar' : 'foo'
    }, 2000)
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper > div {
  flex: 1;
}
</style>
