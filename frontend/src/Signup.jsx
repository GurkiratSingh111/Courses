import React, { useRef } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
const Signup = () => {
    const username = useRef();
    const password = useRef();
    const submitHandler = (e) => {
        e.preventDefault();
        const userName = username.current.value;
        const passWord = password.current.value;
        console.log(userName);
        console.log(passWord);
        fetch("http://localhost:3001/admin/signup", {
            method: "POST",
            body: JSON.stringify({
                userName, passWord
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
                    <TextField fullWidth={true} inputRef={username} id={"username"} label="Email" variant="outlined" />
                    <br /><br />
                    <TextField fullWidth={true} inputRef={password} id={"password"} label="Password" variant="outlined" />
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
