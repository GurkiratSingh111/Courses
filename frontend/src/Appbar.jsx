import { Button, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Appbar = () => {
    const navigate = useNavigate();

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
