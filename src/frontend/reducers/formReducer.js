import { SEND_FORM } from '../actions/types';

const initialState = {
    form: {},
    confirm: false,
    invalidData: false,
    errors: []
};

export default function (state = initialState, action) {
    switch(action.type) {
        case SEND_FORM:
            return {
                ...state,
                guest: action.payload,
                invalidData: action.invalidData,
                errors: action.errors,
                confirm: action.confirm
            };
        default:
            return state;
    }
}