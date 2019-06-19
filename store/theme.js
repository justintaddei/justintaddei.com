export const state = () => ({
  isHeaderDark: false,
  shouldHeaderHaveTitle: false
})

export const mutations = {
  setIsHeaderDark(state, isDark) {
    state.isHeaderDark = isDark
  },
  setShouldHeaderHaveTitle(state, shouldHaveTitle) {
    state.shouldHeaderHaveTitle = shouldHaveTitle
  }
}
