import React, { Fragment, useContext } from 'react'
import { useForm } from 'react-hook-form'
import {  LOADING, ADD_SUCCESS, ADD_FAIL } from "../../actions/types"
import { Context } from '../../contexts/Context'
import axios from 'axios'

const AddTodo = () => {
    const { globalState: { user } ,dispatch } = useContext(Context)
    console.log("Rendering Add todo Component")
    const { register , handleSubmit, formState: {errors} } = useForm()

    const onSubmit = async (data)=>{
        dispatch({type: LOADING, payload: true})
        let request = {
            title: data.title,
            user_id: user.id
        }
        let response = await axios.post('http://localhost:8081/todos',request)
        if(response.status === 201){
            dispatch({type: ADD_SUCCESS, payload: response.data})
        }else{
            dispatch({type: ADD_FAIL, payload: {}})
        }
    }

    return (
        <Fragment>
            <div className="add-todo">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input  {...register('title',{
                        required: true,
                        pattern: /^[a-zA-Z ]+$/
                    })} type="text" placeholder="Todo..."/>
                    
                    <input type="submit" value="Add"/>
                    
                </form>
            </div>
            {errors.title && <p className='center-para'>Enter a valid todo</p>}
        </Fragment>
    )
}

export default React.memo(AddTodo)
