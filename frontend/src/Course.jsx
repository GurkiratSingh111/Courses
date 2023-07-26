import { Button, Card, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Course = () => {
    const { courseId } = useParams();
    console.log(courseId)
    const [courses, setCourses] = useState([]);

    const fetchData = () => {
        function callback2(data) {
            console.log(data);
            setCourses(data.courses);
        }
        function callback1(res) {
            return res.json().then(callback2)
        }
        fetch("http://localhost:3010/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }
    useEffect(() => {
        fetchData();
    }, [])

    let course = "null";
    for (let i = 0; i < courses.length; i++) {
        console.log(courses[i])
        if (courses[i].id === Number(courseId)) {
            course = courses[i];
        }
    }
    console.log("hello" + course);
    if (!course) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <CourseCard course={course} />
            <UpdateCard course={course} />
        </div>
    )
}

function UpdateCard({ course }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const submitHandler = () => {
        fetch("http://localhost:3010/admin/courses/" + course.id, {
            method: "PUT",
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
                alert("course updated");
            })
    }

    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
            <Typography>Update Course Details</Typography>
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
}


function CourseCard({ course }) {
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,

    }}>
        <Typography textAlign="center" variant="h6">{course.title}</Typography>
        <Typography textAlign="center" variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{
            width: "100%",
        }} />
    </Card>
}

export default Course
