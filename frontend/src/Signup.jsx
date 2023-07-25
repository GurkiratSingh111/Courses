import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
const Signup = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const submitHandler = (e) => {
        console.log(username);
        console.log(password);

        fetch("http://localhost:3002/admin/signup", {
            method: "POST",
            body: JSON.stringify({
                username: username, password: password
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
            .then((data) => {
                console.log(data);
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
                    <TextField fullWidth={true} onChange={(e) => { setUsername(e.target.value) }} id={"username"} label="Email" variant="outlined" />
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
