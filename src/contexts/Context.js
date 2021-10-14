import React, { createContext, useReducer } from "react";
import { Reducer } from "../reducers/Reducer";


export const Context = createContext()

const ContextProvider = ({children})=>{
    let [globalState, dispatch] = useReducer(Reducer, {
        isAuthenticated: false,
        isLoading: false,
        error: '',
        user: {},
        todos: []
    })
    // useEffect(() => {
    //     (async ()=>{
    //         if(globalState.isAuthenticated === true){
    //             let response = await axios.get('http://localhost:8081/todos')
    //             dispatch({type: TODOS_SUCCESS, payload: response.data})
    //         } 
    //     })()
    // }, [globalState.isAuthenticated])
    
    return (
        <Context.Provider value={{globalState, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider