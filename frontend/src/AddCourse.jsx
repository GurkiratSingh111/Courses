import { Button, Card, TextField } from '@mui/material'
import React, { useState } from 'react'

const AddCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const submitHandler = () => {
        fetch("http://localhost:3010/admin/courses", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description,
                imageLink: image,
                published: true
            }),
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then((data) => {
                console.log(data);
                alert("course added");
            })
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
                <div>
                    <TextField
                        fullWidth={true}
                        label="Title"
                        variant='outlined'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        fullWidth={true}
                        label="Description"
                        variant='outlined'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        fullWidth={true}
                        label="ImageLink"
                        variant='outlined'
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <Button
                        size={"large"}
                        variant="contained"
                        onClick={submitHandler}
                    >Add Course</Button>
                </div>
            </Card>
        </div>
    )
}

export default AddCourse
