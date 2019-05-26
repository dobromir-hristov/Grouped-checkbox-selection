<template>
  <div>
    {{ fleet.name }}
    <input type="checkbox" v-model="localModel">
    <fleet-machine v-for="machine in fleet.machines" :key="machine.id" :machine="machine"/>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import FleetMachine from "./FleetMachine";

export default {
  name: "SingleFleet",
  components: { FleetMachine },
  props: {
    fleet: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters("fleet", ["isWholeFleetAdded"]),
    localModel: {
      get() {
        return this.isWholeFleetAdded(this.fleet.id);
      },
      set(value) {
        if (value) {
          this.addAllMachinesFromFleet(this.fleet.id);
        } else {
          this.removeAllMachinesFromFleet(this.fleet.id);
        }
      }
    }
  },
  methods: {
    ...mapActions("fleet", [
      "removeAllMachinesFromFleet",
      "addAllMachinesFromFleet"
    ])
  }
};
</script>
