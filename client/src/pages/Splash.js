import React, { useState} from 'react'
import { Redirect } from 'react-router-dom'
import { Input } from '@material-ui/core';
import MyButton from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth'

import './Splash.css'


export default function Splash() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    if (currentUser) return <Redirect to={`/user`}/>

    return (
        <>
            <form className="loginform" onSubmit={handleSubmit}>
                <Input value={email}
                className="login-input"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}>
                </Input>
                <Input value={password}
                className="login-input"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}>
                </Input>
                <MyButton type="submit"> Login </MyButton>
            </form>
        </>
    )

}
