import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './UserPage.css'


export default function UserPage () {
    const [myMeds, setMyMeds] = useState([])
    const currentUser = useSelector(state => state.auth.user)
    useEffect(() => {
        const loadMeds = async () => {
          const res = await fetch(`/api/medication/${currentUser.id}`);
          debugger
          if (res.ok) {
            const data = await res.json();
            console.log(data)
            setMyMeds(data.medication)
          }
        }
        loadMeds()
      }, [myMeds]);



    const renderTime = (tod) => {
        let list1 = []
        for (let i=0; i < myMeds.length; i++) {
            if (myMeds[0][tod] === true) {
                list1.push(
                    <div>
                        {myMeds[i].name}
                        {myMeds[i].dosage}
                    </div>
                )
            }

        }
        return list1


    }



    return (
        <>
            <div className="myMedContainer">
                <div className="time">
                    Morning
                    {renderTime("morning")}
                </div>
                <div className="time">
                    Afternoon
                    {renderTime("afternoon")}
                </div>
                <div className="time">
                    Bedtime
                    {renderTime("bedtime")}
                </div>
            </div>
        </>
    )
}
