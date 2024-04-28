
export const UpdateLocalStorage = (state, name) => {
    localStorage.setItem(name, JSON.stringify(state))
    return state
}
