<template>
  <div>
    {{ machine.id }}
    <input type="checkbox" v-model="localModel" :value="machine.id">
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    machine: Object
  },
  computed: {
    ...mapState("fleet", ["selected"]),
    localModel: {
      get() {
        return this.selected;
      },
      set(value) {
        this.setFleet(value);
      }
    }
  },
  methods: {
    ...mapActions("fleet", ["setFleet"])
  }
};
</script>
