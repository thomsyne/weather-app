import { HistoryModel } from './../core/models/history.model';
export const ADD_HISTORY = 'ADD_HISTORY';
export function addHistoryReducer(state: HistoryModel[] = [], action) {
  switch (action.type) {
    case ADD_HISTORY:
        return [...state, action.payload];
    default:
        return state;
    }
}