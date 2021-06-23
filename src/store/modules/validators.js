// initial state
const state = {
  validators: {},
  validatorsSelect: [],
}

// getters
const getters = {
  getValidatorDescription: state => operatorAddress => {
    let description = {
      moniker: operatorAddress,
      identity: "",
      website: "",
      security_contact: "",
      details: "",
    }
    if (operatorAddress in state.validators) {
      description = state.validators[operatorAddress].description
    }
    return description
  },

  getValidatorStatus: state => operatorAddress => {
    const status = {
      status: 0,
      jailed: false,
    }
    if (operatorAddress in state.validators) {
      status.status = state.validators[operatorAddress].status
      status.jailed = state.validators[operatorAddress].jailed
    }
    return status
  },

  getValidatorMoniker: (state, getters) => operatorAddress => {
    return getters.getValidatorDescription(operatorAddress).moniker
  },
}

// actions
const actions = {
  clearValidators(context) {
    context.commit("clearValidators")
  },

  addValidator(context, validator) {
    if (!(validator.operator_address in context.state.validators)) {
      context.commit("addValidator", validator)
    }
  },

  updateValidatorsSelect(context) {
    const validatorSelectArray = []

    const keys = Object.keys(context.state.validators)
    for (let i = 0; i < keys.length; i += 1) {
      if (Object.prototype.hasOwnProperty.call(context.state.validators, keys[i])) {
        if (context.state.validators[keys[i]].status === 2) {
          const valOption = {
            value: keys[i],
            text: context.state.validators[keys[i]].description.moniker,
          }
          validatorSelectArray.push(valOption)
        }
      }
    }
    validatorSelectArray.sort((a, b) => (a.text > b.text ? 1 : -1))
    context.commit("updateValidatorsSelect", validatorSelectArray)
  },
}

// mutations
const mutations = {
  clearValidators(state) {
    state.validators = {}
    state.validatorsSelect = []
  },

  addValidator(state, validator) {
    state.validators[validator.operator_address] = validator
  },

  updateValidatorsSelect(state, validatorsSelectArray) {
    state.validatorsSelect = validatorsSelectArray
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
