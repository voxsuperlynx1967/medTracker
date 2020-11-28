import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './UserPage.css'
import { Checkbox } from '@material-ui/core';
import { Input } from '@material-ui/core';
import MyButton from '../components/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export default function UserPage () {
    const [myMeds, setMyMeds] = useState([])
    const currentUser = useSelector(state => state.auth.user)
    const [med, setMed] = useState({userId: currentUser.id, morning: false, afternoon: false, bedtime: false})
    const loadMeds = async () => {
        const res = await fetch(`/api/medication/${currentUser.id}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data)
          setMyMeds(data.medication)
        }
    }
    useEffect(() => {
        loadMeds()
    }, []);
    const addMeds = async () => {
        const res = await fetch(`/api/medication/${currentUser.id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(med)

        })
        const data = await res.json();
        console.log(res.message)
        loadMeds()
    }
    const handleSubmit = (e) => {
        console.log(med)
        e.preventDefault()
        addMeds()

    }





    const renderTime = (tod) => {
        let list1 = []
        for (let i=0; i < myMeds.length; i++) {
            if (myMeds[i][tod] === true) {
                list1.push(
                    <div>
                        {myMeds[i].name}
                        {' '}
                        {myMeds[i].dosage}
                    </div>
                )
            }

        }
        return list1


    }



    return (
        <>
            <form className="medform" onSubmit={handleSubmit}>
                <div className="formtitle">Med Input</div>
                <Input
                className="login-input"
                placeholder="Name"
                onChange={e => setMed({...med, name: e.target.value})}>
                </Input>
                <Input
                className="login-input"
                placeholder="Dosage"
                onChange={e => setMed({...med, dosage: e.target.value})}>
                </Input>
                <FormControlLabel
                control={
                <Checkbox
                className="login-input"
                placeholder="Morning"
                onChange={e => setMed({...med, morning: e.target.checked})}>
                </Checkbox>}
                label="Morning"
                />
                <FormControlLabel
                control={
                <Checkbox
                className="login-input"
                placeholder="Afternoon"
                onChange={e => setMed({...med, afternoon: e.target.checked})}>
                </Checkbox>}
                label="Afternoon"
                />
                <FormControlLabel
                control={
                <Checkbox
                className="login-input"
                placeholder="Bedtime"
                onChange={e => setMed({...med, bedtime: e.target.checked})}>
                </Checkbox>}
                label="Bedtime"
                />
                <MyButton type="submit"> Add Med </MyButton>
            </form>
            <div className="myMedContainer">
                <div className="time">
                    <span className="title">Morning</span>
                    {renderTime("morning")}
                </div>
                <div className="time">
                    <span className="title">Afternoon</span>
                    {renderTime("afternoon")}
                </div>
                <div className="time">
                    <span className="title">Bedtime</span>
                    {renderTime("bedtime")}
                </div>
            </div>
        </>
    )
}
