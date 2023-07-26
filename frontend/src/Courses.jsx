import { Card, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

const Courses = () => {
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
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {courses.map((course) => {
                return <Course course={course} />
            })}
        </div>
    )
}

export function Course(props) {
    const { title, description, imageLink } = props.course;
    return <Card style={{ margin: 10, width: 300, minHeight: 200 }}>
        <Typography textAlign="center" variant="h6">{title}</Typography>
        <Typography textAlign="center" variant="subtitle1">{description}</Typography>
        <img src={imageLink} style={{
            width: "100%",
        }} />
    </Card>


}

export default Courses
