<template functional>
  <Function :fn="() => props.vnode" v-bind="data.attrs" v-on="listeners" :key="data && data.key" />
</template>

<script>
export default {
  props: {
    vnode: { required: true }
  }
}
</script>
