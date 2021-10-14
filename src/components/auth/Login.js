import React, {Fragment, useContext} from 'react'
import { useForm } from 'react-hook-form'
import { LOADING, LOGIN_FAIL, LOGIN_SUCCESS } from '../../actions/types'
import { Context } from '../../contexts/Context'
import Navbar from './Navbar'
import axios from 'axios'
import { useHistory } from 'react-router'

const Login = () => {
    const history = useHistory()
    const { globalState: { isLoading, error } ,  dispatch } = useContext(Context)
    console.log("Rendering Login Component")
    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = async (data)=>{
        dispatch({type: LOADING, payload: true})
        let response = await axios.get(`http://localhost:8081/users?email=${data.email}&password=${data.password}`)
        let result = response.data
        if(result.length === 1){
            dispatch({type: LOGIN_SUCCESS, payload: result[0] })
            history.push('/user')
        }else{
            dispatch({type: LOGIN_FAIL, payload: {} })
        }
    }
    return (
        <Fragment>
        <Navbar />
        <div className="auth">
                <form className="auth-login" onSubmit={handleSubmit(onSubmit)}>
                    
                    <input {...register('email', {
                        required: true
                    })}  type="text" placeholder="Email"/>
                    {errors.email && <p>Email is required</p>}

                    <input {...register('password',{
                        required: true
                    })} type="password" placeholder="password"/>
                    {errors.password && <p>Password is required</p>}

                    {isLoading === true && <p>Loading</p>}
                    { error !== '' && <p>{error}</p> }

                    <input type="submit" value="Submit"/>
                </form>
        </div>
        </Fragment>
    )
}

export default React.memo(Login)
