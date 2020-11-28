import React, { useState} from 'react'
import { Redirect } from 'react-router-dom'
import { Input } from '@material-ui/core';


export default function Splash() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const currentUser = useSelector(state => state.auth.user)


    if (currentUser) return <Redirect to={`/user/${currentUser.id}`}/>

    return (
        <>
            <form>

            </form>
        </>
    )

}
