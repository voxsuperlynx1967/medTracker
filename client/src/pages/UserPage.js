import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './UserPage.css'
import { Checkbox } from '@material-ui/core';
import { Input } from '@material-ui/core';
import MyButton from '../components/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export default function UserPage () {
    const [myMeds, setMyMeds] = useState([])
    const [med, setMed] = useState('')
    const currentUser = useSelector(state => state.auth.user)
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



    const renderTime = (tod) => {
        let list1 = []
        for (let i=0; i < myMeds.length; i++) {
            if (myMeds[0][tod] === true) {
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
            <form className="medform">
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
                onChange={e => setMed({...med, morning: e.target.value})}>
                </Checkbox>}
                label="Morning"
                />
                <FormControlLabel
                control={
                <Checkbox
                className="login-input"
                placeholder="Afternoon"
                onChange={e => setMed({...med, afternoon: e.target.value})}>
                </Checkbox>}
                label="Afternoon"
                />
                <FormControlLabel
                control={
                <Checkbox
                className="login-input"
                placeholder="Bedtime"
                onChange={e => setMed({...med, bedtime: e.target.value})}>
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
