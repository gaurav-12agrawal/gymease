export const initialState = 0
export const reducer = (state, action) => {
    if (action.type === 'USER') { return action.payload }
    return state;
}