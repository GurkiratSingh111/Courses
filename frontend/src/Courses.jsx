import React, { useEffect, useState } from 'react'

const Courses = () => {
    const [courses, setCourses] = useState([]);

    const fetchData = () => {
        function callback2(data) {
            console.log(data);
            setCourses(data);
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
        <div>
            Courses
        </div>
    )
}

export default Courses
