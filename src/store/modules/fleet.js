import fleet from "@/data/fleet"

const state = {
  fleet: [],
  fleetHashMap: {},
  selected: []
}

const getters = {
  // We could also transform them to an object (hashmap) for easier searching
  getFleet: (state, getters) => fleetId => {
    return state.fleet.filter(fleet.id === fleetId)
  },
  isWholeFleetAdded: state => fleetId => {
    return state.fleetHashMap[fleetId].every(fl => state.selected.includes(fl))
  },
  areAllFleetAdded(state) {
    return (
      state.selected.length ===
      state.fleet.reduce((all, current) => {
        return all + current.machines.length
      }, 0)
    )
  }
}

const mutations = {
  STORE_FLEET(state, fleet) {
    state.fleet = fleet
  },
  STORE_FLEET_HASH_MAP(state, fleet) {
    state.fleetHashMap = fleet.reduce((all, currentFleet) => {
      all[currentFleet.id] = currentFleet.machines.map(m => m.id)
      return all
    }, {})
  },
  STORE_SELECTED(state, items) {
    state.selected = items
  },
  ADD_UNIQUE(state, items) {
    state.selected = [...new Set([...state.selected, ...items])]
  },
  REMOVE_PROVIDED(state, items) {
    state.selected = state.selected.filter(m => !items.includes(m))
  }
}

const actions = {
  fetchFleet({ commit }) {
    // some async action from store
    commit("STORE_FLEET", [...fleet])
    commit("STORE_FLEET_HASH_MAP", [...fleet])
  },
  addAllMachinesFromAllFleet({ commit, state }) {
    const allMachines = state.fleet.reduce((all, currentFleet) => {
      const machines = currentFleet.machines.map(m => m.id)
      return all.concat(machines)
    }, [])
    commit("STORE_SELECTED", allMachines)
  },
  removeAll({ commit }) {
    commit("STORE_SELECTED", [])
  },
  setFleet({ commit }, values) {
    commit("STORE_SELECTED", values)
  },
  addAllMachinesFromFleet({ commit, state }, id) {
    // transform the machines to a simple array of id's
    commit("ADD_UNIQUE", state.fleetHashMap[id])
  },
  removeAllMachinesFromFleet({ commit, state }, id) {
    commit("REMOVE_PROVIDED", state.fleetHashMap[id])
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
