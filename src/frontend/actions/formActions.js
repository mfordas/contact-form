import axios from 'axios';

import {
    SEND_FORM, RESTART_FORM
} from './types';
import setHeaders from '../utils/setHeaders';

export const postGuest = guest => async (dispatch) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/api/guests',
            data: guest,
            headers: setHeaders()
        });

        if (res.status === 200) {
            dispatch({
                type: SEND_FORM,
                payload: res.body,
                confirm: true

            })
        } else {
            dispatch({
                type: SEND_FORM,
                invalidData: true,
                confirm: false
            })

        }
    } catch (error) {
        console.error('Error Registration:', error.message);
        dispatch({
            type: SEND_FORM,
            errors: error.response.data.details,
            invalidData: true,
            confirm: false
        })
    }
};


export const restartForm = () => dispatch => {
    dispatch({
        type: RESTART_FORM,
        confirm: false
    })
};