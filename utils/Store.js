import { createContext, useReducer } from "react";
import Cookies from 'js-cookie'
export const Store = createContext();
const initialState ={
    Darkmode: Cookies.get('darkMode')==='ON'? true: false,

};

function reducer(state, action){
    switch(action.type){
        case "DARKMODE_NO":
            return{...state, DarkMood:true}
            case "DARKMODE_NO":
            return{...state, DarkMood:false}
            default:
            return state;
    }
 

}

export function StoreProvider(props){
    const[state,dispatch] =useReducer(reducer, initialState)
    const value ={state, dispatch};
    return <Store.Provider value ={value}>{props.children}</Store.Provider>
}


