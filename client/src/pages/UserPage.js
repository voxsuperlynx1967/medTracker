import React, { useState, useEffect } from 'react'


export default function UserPage () {
    const [myMeds, setMyMeds] = useState('')
    const currentUser = useSelector(state => state.auth.user)

    return (
        <>
            <div>
                Hi
            </div>
        </>
    )
}
