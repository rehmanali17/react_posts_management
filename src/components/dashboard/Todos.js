import React, { Fragment, useState, useContext, useEffect } from 'react'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'
import { Context } from '../../contexts/Context'
import Navbar from './Navbar'
import axios from 'axios'
import { TODOS_SUCCESS, LOADING, DELETE_FAIL, DELETE_SUCCESS, TODOS_FAIL } from "../../actions/types"
import { useHistory } from 'react-router'


const Todos = () => {
    const history = useHistory()
    console.log("Rendering Todos Component");
    const { globalState: { isLoading , todos, user, error }, dispatch } = useContext(Context)
    const [open, setOpen ] = useState(-1)
    
    const showEditComponent = (state)=>{
        setOpen(state)
    }

    
    if(user.id === undefined ){
        history.push('/')
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        (async ()=>{
            let response = await axios.get(`http://localhost:8081/todos?user_id=${user.id}`)
            if(response.status === 200){
                dispatch({type: TODOS_SUCCESS, payload: response.data})
            }else{
                dispatch({type: TODOS_FAIL, payload: []})
            }
            
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const deleteTodo = async (id)=>{
        dispatch({type: LOADING, payload: true})
        let response = await axios.delete(`http://localhost:8081/todos/${id}`)
        if(response.status === 200){
            dispatch({type: DELETE_SUCCESS , payload: id })
        }else{
            dispatch({type: DELETE_FAIL , payload: {}})
        }
    }  

    return (
        <Fragment>
        <Navbar user={user.name} />
        
        <div className="dashboard">
            <ul className="item-container">
                <AddTodo />
                {isLoading === true ? 
                    <p>Loading</p> : 
                    <Fragment>
                        {open >= 0 && <EditTodo showEditComponent={showEditComponent} todo={todos[open]}  />}
                        {todos.map((todo,i) => {
                            return (
                                <Fragment key={todo.id}>
                                    <div className="item">
                                        <li onClick={()=> { deleteTodo(todo.id) }}>{todo.title}</li>
                                        <button onClick={()=>{ showEditComponent(i) }}>Edit</button>
                                    </div>
                                </Fragment>
                            )
                        })}
                    </Fragment>
                }            
            </ul>
        </div>
        {isLoading === true &&<p className="center-para">Loading</p>}
        {error !== '' &&<p  className="center-para">{error}</p>}
        </Fragment>
    )
}

export default Todos
