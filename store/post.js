export const state = () => {
  return {
    draftList: []
  }
}

export const mutations = {
  setDraftList(state, data) {
    state.draftList = data
    // console.log(data)
  }
}