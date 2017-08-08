import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const JUMP = ('JUMP')
export const SYNC = ('SYNC')
export const PRESENT = ('PRESENT')
export const INITIALIZE = ('INITIALIZE')
export const STEP_FORWARD = ('STEP_FORWARD')
export const STEP_BACKWARD = ('STEP_BACKWARD')
export const MOVE_FORWARD = ('MOVE_FORWARD')
export const MOVE_BACKWARD = ('MOVE_BACKWARD')

const actions = {
  present ({ commit }, { enabled }) {
    if (typeof enabled === 'boolean') {
      commit(PRESENT, { enabled })
    }
  },
  init ({ commit }, payload) {
    commit(INITIALIZE, payload)
  },
  jump ({ commit, state }, { index }) {
    index = Math.min(state.meta.total, Math.max(0, index))
    commit(JUMP, index)
  },
  step ({ dispatch }, payload = {}) {
    if (payload.delta < 0) dispatch('_stepPrev', payload)
    else if (payload.delta > 0) dispatch('_stepNext', payload)
  },
  sync ({ commit }, payload) {
    commit(SYNC, payload)
  },
  move ({ dispatch }, payload = {}) {
    if (payload.delta < 0) dispatch('_movePrev', payload)
    else if (payload.delta > 0) dispatch('_moveNext', payload)
  },
  _stepNext ({ commit, state: { meta, control } }, { delta = 1 } = {}) {
    while (delta > 0) {
      if (
        control.index < meta.total // not on last slide,
        || control.step < meta.steps[control.index] // not on last step of last slide.
      ) {
        commit(STEP_FORWARD)
      }

      --delta
    }
  },
  _stepPrev ({ commit, state: { meta, control } }, { delta = -1 } = {}) {
    delta = -delta
    while (delta > 0) {
      if (
        control.index > 0 // not on first slide,
        || control.step > 1 // not on first step of first slide.
      ) {
        commit(STEP_BACKWARD)
      }

      --delta
    }
  },
  _moveNext ({ commit, state: { meta, control } }, { delta = 1 } = {}) {
    while (delta > 0) {
      if (control.index < meta.total) {
        commit(MOVE_FORWARD)
      }

      --delta
    }
  },
  _movePrev ({ commit, state: { meta, control } }, { delta = -1 } = {}) {
    delta = -delta
    while (delta > 0) {
      if (control.index > 0) {
        commit(MOVE_BACKWARD)
      }

      --delta
    }
  }
}

const mutations = {
  [INITIALIZE] (state, { total, steps, notes }) {
    state.initialized = true
    state.presenter.notes = ['', ...notes.map(any => String(any).trim()), '']
    state.meta.total = total
    state.meta.totalSteps = steps.reduce((prev, cur) => prev + cur, 0)
    state.meta.steps = steps
  },

  [JUMP] (state, index) {
    state.control.lastIndex = state.control.index
    state.control.index = index
    state.control.step = 1
  },

  [STEP_FORWARD] (state) {
    const { control: { index, step }, meta: { steps } } = state
    const slide = steps[index]

    if (slide <= step) {
      state.control.index = index + 1
      state.control.lastIndex = index
      state.control.step = 1
    } else {
      state.control.step = step + 1
    }
  },

  [STEP_BACKWARD] (state) {
    const { control: { index, step }, meta: { steps } } = state

    if (1 === step) {
      const slide = steps[index - 1]
      state.control.index = index - 1
      state.control.lastIndex = index
      state.control.step = slide
    } else {
      state.control.step = step - 1
    }
  },

  [MOVE_FORWARD] (state) {
    const { control: { index } } = state

    state.control.index = index + 1
    state.control.lastIndex = index
    state.control.step = 1
  },

  [MOVE_BACKWARD] (state) {
    const { control: { index } } = state

    state.control.index = index - 1
    state.control.lastIndex = index
    state.control.step = 1
  },

  [SYNC] (state, control) {
    state.control = control
  },

  [PRESENT] (state, { enabled }) {
    state.presenter.enabled = enabled
  }
}

const state = {
  initialized: false,
  meta: {
    total: -1,
    totalSteps: -1,
    steps: []
  },
  control: {
    index: 0,
    lastIndex: -1,
    step: 1
  },
  presenter: {
    enabled: false
  }
}

const getters = {
  isInitialized: state => state.initialized,
  lastIndex: state => state.control.lastIndex,
  index: state => state.control.index,
  step: state => state.control.step,
  isLastSlide: state => state.control.index >= state.meta.total,
  isFirstSlide: state => state.control.index === 0,
  isPresenterViewEnabled: state => state.presenter.enabled,
  total: state => state.meta.total,
  presenter: state => state.presenter
}

export default new Vuex.Store({ state, actions, mutations, getters })
