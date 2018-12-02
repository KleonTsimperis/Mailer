import * as ACTION from './actionTypes';
import axios from 'axios';

export const handleText = value => ({
    type: ACTION.HANDLETEXT,
    payload: value
});

export const handleSubmit = event => dispatch => {
    event.preventDefault();
    dispatch({type: ACTION.HANDLESUBMIT})
}
    
export const fetchJoke = () => dispatch => {
    dispatch({
        type: ACTION.ISLOADING        
    })
    axios.get('http://api.icndb.com/jokes/random')
         .then(res => dispatch({
             type: ACTION.FETCHJOKE,
             payload: res.data.value.joke
         }))
}

export const sendEmails = (emails, joke) => dispatch => {
    axios.post('http://localhost:3009/submit', {data: emails, joke})
         .then(res => dispatch({
            type: ACTION.SENDEMAILS,
            payload: res.data
         }))
}
    





