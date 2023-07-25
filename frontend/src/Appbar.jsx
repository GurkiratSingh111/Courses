import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Appbar = () => {
    const navigate = useNavigate();//if we are using this useNavigate hook 
    // in a component then that component should be inside the <Router>
    //</Router> in App.jsx
    const [userEmail, setUserEmail] = useState(null);


    useEffect(() => {
        function callback2(data) {
            console.log(data);
            if (data.username) {
                setUserEmail(data.username);

            }
        }
        function callback1(res) {
            return res.json().then(callback2)
        }
        fetch("http://localhost:3010/admin/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, [])


    if (userEmail) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
        }}>
            <Typography variant={"h6"}>Coursera</Typography>
            <div style={{ display: "flex" }}>
                <div>
                    {userEmail}
                </div>
                <div style={{ marginRight: 10 }}>
                    <Button
                        variant={'contained'}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/";
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
        }}>
            <Typography variant={"h6"}>Coursera</Typography>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: 10 }}>
                    <Button
                        variant={'contained'}
                        onClick={() => {
                            navigate('/signup')
                        }}
                    >Sign up</Button>
                </div>
                <div style={{ marginRight: 10 }}>
                    <Button
                        variant={'contained'}
                        onClick={() => {
                            navigate('/signin')
                        }}
                    >Sign in</Button>
                </div>
            </div>
        </div>
    )
}

export default Appbar;
