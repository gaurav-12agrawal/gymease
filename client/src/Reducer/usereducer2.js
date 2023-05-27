export const initialState2 = null
export const reducer2 = (state2, action) => {
    if (action.type === 'USER') { return action.payload }
    return state2;
}