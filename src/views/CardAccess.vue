<template>
  <div>
    <card-access :cardAccess="access"></card-access>
  </div>
</template>

<script>
import CardAccess from '../components/CardAccess'
  export default {
    props: {
      'id': {
        type: String,
        required: true
      }
    },
    computed: {
      access() {
        return this.$store.getters.getAccesses.find(b => b.id == this.id)
      }
    },
    components: {
      CardAccess
    }
  }
</script>

<style scoped>

</style>
