import { ADD_ITEM } from './actionTypes'

let nextItemId = 0

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: {
        id: ++nextItemId,
        item
    }
})
