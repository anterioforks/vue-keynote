<template>
 <div class="presenter">

   <div v-if="showNavigator" class="navigator">
     <slot name="navigator" />
   </div>

   <div v-if="showNavigatorControl" class="navigator-control">
     <!-- <button class="navigation-toggler">|||</button> -->
   </div>

   <div v-if="showActions" class="actions">
     <!-- <button class="configure">[]</button> -->
     <button class="exit">&times;</button>
   </div>

   <div v-if="showClock" class="clock">
     <Clock />
   </div>

   <div v-if="showTimer" class="timer">
     <Timer />
   </div>

   <div class="clear" />

   <div v-if="showCurrent" class="current">
     <div class="current-wrapper" :style="current">
       <slot name="current" />
     </div>
     <slot name="currentMessage" />
   </div>

   <div v-if="showNext" class="next">
     <div class="current-wrapper" :style="next">
      <slot name="next" />
     </div>
     <slot name="nextMessage" />
   </div>

   <div v-if="showNotes" class="notes">
     <slot name="notes" />
   </div>

 </div>
</template>

<script>
import Clock from './Clock.vue'
import Timer from './Timer.vue'

export default {
  data: () => ({
    showNavigator: false,
    showNavigatorControl: true,
    showActions: true,
    showClock: true,
    showTimer: true,
    showCurrent: true,
    showNext: true,
    showNotes: true,
    width: 16,
    height: 9
  }),

  computed: {
    h () {
      return 9 / 16
    },

    w () {
      return 16 / 9
    },

    calc () {
      return (height, max) => {
        max = (max * this.width) - 30
        height = .4 * this.height
        let width = this.w * height

        if (width > max) {
          width = max
          height = this.h * width
        }

        return { width: width + 'px', height: height + 'px' }
      }
    },

    current () {
      return this.calc(.4, .6)
    },

    next () {
      return this.calc(.4, .3)
    }
  },

  methods: {
    measure () {
      this.width = window.innerWidth
      this.height = window.innerHeight
    }
  },

  beforeMount () {
    this.measure()
    window.addEventListener('resize', this.measure)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.measure)
  },

  components: {
    Clock, Timer
  }
}
</script>


<style lang="scss" scoped>
.presenter {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-flow: wrap;
  background: black;
  color: white;

  > * {
    box-sizing: border-box
  }
}

.clock {
  flex: 1 1 50%;
}

.timer {
  flex: 1 1 50%;
}

.clear {
  flex: 1 1 100%;
}

.current {
  flex: 1 1 60%;
  padding: 15px;
  box-sizing: border-box;
  font-size: .6em;
}

.next {
  flex: 1 1 40%;
  padding: 15px;
  box-sizing: border-box;
  font-size: .4em;
}

.current, .next, .current-wrapper {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column
}

.current-wrapper {
  margin: 0 auto;
}

.notes {
  flex: 1 1 50%;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 15px;
  box-sizing: border-box;
  background: #efefef;
  color: rgba(0, 0, 0, .95);
  margin: 15px;
  height: 30vh;
}

.navigator-control, .actions {
  position: fixed
}

.navigator {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 10vw;
  height: 100vh;
  overflow: auto;
  font-size: .1em;
  background-color: rgba(0, 0, 0, .75);
  > * {
    margin: 5px;
  }
}

.actions {
  position: fixed;
  top: 0;
  right: 16px;

  .exit {
    background: none;
    border: none;
    font-size: 48px;
    color: white;
  }
}
</style>

