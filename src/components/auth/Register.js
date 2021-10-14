import React, { Fragment, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../../contexts/Context'
import Navbar from './Navbar'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOADING } from '../../actions/types'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const history = useHistory();
    const { globalState: {isLoading, error} ,  dispatch } = useContext(Context)
    console.log('Rendering Register Component')
    const { register, handleSubmit, formState : {errors} } = useForm()


    const onSubmit = async (data)=>{
        dispatch({type: LOADING, payload: true})
        let response = await axios.post('http://localhost:8081/users', data)
        if(typeof(response.data) ==='object'){
            dispatch({type :REGISTER_SUCCESS, payload: response.data})
            history.push('/user')
        }else{
            dispatch({type :REGISTER_FAIL, payload: {}})
        }  
    }

    return (
        <Fragment>
            <Navbar />
            <div className="auth">
                    <form className="auth-register" onSubmit={handleSubmit(onSubmit)}>
                        
                        <input {...register('name',{
                            required: true,
                            pattern: /^[a-zA-Z ]+$/
                        })} type="text" placeholder="Name"/>
                        {errors.name && <p>Enter a valid name</p>}
                        
                        <input {...register('age',{
                            required: true,
                            pattern: /^[0-9]{1,3}$/
                        })} type="number" placeholder="age"/>
                        {errors.age && <p>Enter a valid age</p>}

                        <input {...register('email',{
                            required: true,
                           pattern: /^([\w .-]+)@([a-zA-Z]+).([a-zA-Z]{2,8})$/
                        })} type="text" placeholder="Email"/>
                        {errors.email && <p>Enter a valid email</p>}

                        <input {...register('password',{
                            required: true,
                            pattern: /^[a-zA-Z0-9 ]{6,}$/
                        })} type="password" placeholder="password"/>
                        {errors.password && <p>Enter a 6 digits alphanumeric password</p>}

                        {isLoading === true && <p>Loading</p>}
                        { error !== '' && <p>{error}</p> }

                        <input type="submit" value="Submit"/>
                    </form>
            </div>
        </Fragment>
    )
}

export default React.memo(Register)