<template>
  <div>
    Set All
    <input type="checkbox" v-model="setAllModel">
    <single-fleet v-for="singleFleet in fleet" :key="singleFleet.id" :fleet="singleFleet"/>
  </div>
</template>

<script>
import SingleFleet from "./SingleFleet";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "FleetList",
  components: {
    SingleFleet
  },
  computed: {
    ...mapState("fleet", ["fleet"]),
    ...mapGetters("fleet", ["areAllFleetAdded"]),
    setAllModel: {
      get() {
        return this.areAllFleetAdded;
      },
      set(value) {
        return value ? this.addAllMachinesFromAllFleet() : this.removeAll();
      }
    }
  },
  mounted() {
    this.fetchFleet();
  },
  methods: {
    ...mapActions("fleet", [
      "fetchFleet",
      "addAllMachinesFromAllFleet",
      "removeAll"
    ])
  }
};
</script>
