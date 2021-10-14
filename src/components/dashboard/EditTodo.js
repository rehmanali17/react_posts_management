import React, {Fragment, useContext} from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../../contexts/Context'
import axios from 'axios'
import {  LOADING, EDIT_SUCCESS, EDIT_FAIL } from "../../actions/types"

const EditTodo = ({ showEditComponent, todo }) => {
    const { globalState: {isLoading, error, user }, dispatch } = useContext(Context)
    console.log("Rendering Edit todo Component")
    const {register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = async (data) => {
        dispatch({type: LOADING, payload: true})
        let request = {
            title: data.title,
            user_id: user.id
        }
        let response = await axios.put(`http://localhost:8081/todos/${todo.id}`,request)
        if(response.status === 200){
            dispatch({type: EDIT_SUCCESS, payload: response.data})
            showEditComponent(-1)
        }else{
            dispatch({type: EDIT_FAIL, payload: {}})
        }
        
    }
    return (
        <Fragment>
            <div className="edit-todo">
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <input defaultValue={todo.title} {...register('title', {
                        required: true,
                        pattern: /^[a-zA-Z ]+$/
                    }) } type="text" placeholder="Todo..."/>
                    {errors.title && <p>Enter a valid title</p>}
                    {isLoading && <p>Loading</p>}
                    {error && <p>{error}</p>}

                    <input type="submit" value="Edit"/>
                </form>
            </div>
            <button onClick={()=>{showEditComponent(-1)}} className="close">x</button>
        </Fragment>
    )
}

export default EditTodo
