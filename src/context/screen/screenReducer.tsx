import {CHANGE_SCREEN} from '../todo/types';

    const handlers = {
        [CHANGE_SCREEN]: (state: any, payload:any) => payload,
        DEFAULT: (state: any) => state
    }


export const screenReducer= (state: any,action: any) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action.payload)
}