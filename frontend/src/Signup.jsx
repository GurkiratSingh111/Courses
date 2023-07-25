import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const submitHandler = (e) => {
        console.log(email);
        console.log(password);

        fetch("http://localhost:3010/admin/signup", {
            method: "POST",
            body: JSON.stringify({
                username: email, password: password
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
            .then((data) => {
                localStorage.setItem("token", data.token);
                window.location = "/";
                //navigate('/')
                console.log(data.token);
            })
    }
    return (
        <div>
            <div style={{
                display: "flex",
                paddingTop: 150,
                marginBottom: 10,
                justifyContent: "center",
            }}>
                <Typography variant={"h6"}> Welcome to Coursera, Sign up below</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
                    <TextField fullWidth={true} onChange={(e) => { setEmail(e.target.value) }} id={"username"} label="Email" variant="outlined" />
                    <br /><br />
                    <TextField fullWidth={true} onChange={(e) => { setPassword(e.target.value) }} id={"password"} label="Password" variant="outlined" />
                    <br /><br />
                    <Button
                        size={"large"}
                        variant="contained"
                        onClick={submitHandler}>Sign up</Button>
                </Card>
            </div>
        </div>



    )
}

export default Signup
