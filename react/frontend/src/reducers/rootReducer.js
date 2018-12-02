import * as ACTION from '../actions/actionTypes';

const validateEmail = email => {
    const regEx = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
}

const initialState = {
    isLoading: false,
    emails: [],
    text: '',
    joke: null,
    isError:false,
    sentTo:[]
};

var lastId = 0;

const assignNewId = () => {
    lastId++;
    let id = lastId;
    return id;
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION.ISLOADING:
            return state = {
                ...state,
                isLoading: true
            }
        case ACTION.HANDLETEXT:
            return state = {
                ...state,
                text: action.payload,
                isError: false
            }
        case ACTION.HANDLESUBMIT:
            const isValidated = validateEmail(state.text);
            if(isValidated){
                const id = assignNewId();
                const allEmails = [...state.emails, {email: state.text, id} ]
                const sortByDomain = allEmails.sort((a, b) => {
                    // finding the string number at which the domain name after the @ starts
                    const locA = a.email.indexOf('@');
                    const locB = b.email.indexOf('@');

                    const domainNameA = a.email.toUpperCase().substring(locA);
                    const domainNameB = b.email.toUpperCase().substring(locB);
                    if (domainNameA < domainNameB) {
                        return -1;
                    }
                    if (domainNameA > domainNameB) {
                        return 1;
                    }
                    
                    // if domain names are equal using the substring to sort up to the @
                    if (domainNameA === domainNameB){
                        const nameA = a.email.toUpperCase().substring(0, locA)
                        const nameB = b.email.toUpperCase().substring(0, locB)
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0
                    }
                    return 0;
                });
                return state = {
                    ...state,
                    text: '',
                    emails: sortByDomain
                }
            } else {
                return state = {
                    ...state,
                    isError: true
                }
            }
        case ACTION.FETCHJOKE:
            return state = {
                ...state,
                joke: action.payload,
                isLoading: false
            }
        case ACTION.SENDEMAILS:
            return state = {
                ...state,
                sentTo:[action.payload, ...state.sentTo]
            }
    default:
        return state;
    }
}

export default rootReducer;