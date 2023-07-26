import { Button, Card, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const Course = () => {
    const { courseId } = useParams();
    console.log(courseId)
    console.log("Hii there from course")
    //const [courses, setCourses] = useState([]);
    const setCourses = useSetRecoilState(coursesState); // this won't rerender on update


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
        <div style={{ display: "flex", justifyContent: "center" }}>
            <CourseCard courseId={courseId} />
            <UpdateCard courseId={courseId} />
        </div>
    )
}

function UpdateCard(props) {
    const { courseId } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [courses, setCourses] = useRecoilState(coursesState);

    console.log("coursecard rerendered");
    const submitHandler = () => {
        fetch("http://localhost:3010/admin/courses/" + courseId, {
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
                let updatedCourses = [];
                for (let i = 0; i < courses.length; i++) {
                    if (courses[i].id == courseId) {
                        updatedCourses.push({
                            id: courseId,
                            title: title,
                            description: description,
                            imageLink: image,
                        });
                    } else {
                        updatedCourses.push(courses[i]);
                    }
                }
                setCourses(updatedCourses);
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
                >Update Course</Button>
            </div>
        </Card>
    </div>
}


function CourseCard(props) {
    const courses = useRecoilValue(coursesState);
    let course = "null";
    for (let i = 0; i < courses.length; i++) {
        console.log(courses[i])
        if (courses[i].id == (props.courseId)) {
            course = courses[i];
        }
    }
    console.log("coursecard rerendered");
    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{
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
    </div>
}

export default Course


const coursesState = atom({
    key: 'coursesState',
    default: '',
})


// import { Card } from "@mui/material";
// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom";
// import { Typography, TextField, Button } from "@mui/material";
// import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// function Course() {
//     let { courseId } = useParams();
//     console.log("hi there from course")

//     const setCourses = useSetRecoilState(coursesState);

//     useEffect(() => {
//         function callback2(data) {
//             setCourses(data.courses);
//         }
//         function callback1(res) {
//             res.json().then(callback2)
//         }
//         fetch("http://localhost:3010/admin/courses/", {
//             method: "GET",
//             headers: {
//                 "Authorization": "Bearer " + localStorage.getItem("token")
//             }
//         }).then(callback1)
//     }, []);

//     return <div>
//         <CourseCard courseId={courseId} />
//         <UpdateCard courseId={courseId} />
//     </div>
// }

// function UpdateCard(props) {
//     console.log("hi there from update card")
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [image, setImage] = useState("");
//     const course = props.course;
//     const [courses, setCourses] = useRecoilState(coursesState);

//     console.log("UpdateCard rerendered");
//     return <div style={{ display: "flex", justifyContent: "center" }}>
//         <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
//             <Typography>Update course details</Typography>
//             <TextField
//                 onChange={(e) => {
//                     setTitle(e.target.value)
//                 }}
//                 fullWidth={true}
//                 label="Title"
//                 variant="outlined"
//             />

//             <TextField
//                 onChange={(e) => {
//                     setDescription(e.target.value)
//                 }}
//                 fullWidth={true}
//                 label="Description"
//                 variant="outlined"
//             />

//             <TextField
//                 onChange={(e) => {
//                     setImage(e.target.value)
//                 }}
//                 fullWidth={true}
//                 label="Image link"
//                 variant="outlined"
//             />

//             <Button
//                 size={"large"}
//                 variant="contained"
//                 onClick={() => {
//                     function callback2(data) {
//                         let updatedCourses = [];
//                         for (let i = 0; i < courses.length; i++) {
//                             if (courses[i].id == props.courseId) {
//                                 updatedCourses.push({
//                                     id: props.courseId,
//                                     title: title,
//                                     description: description,
//                                     imageLink: image
//                                 })
//                             } else {
//                                 updatedCourses.push(courses[i]);
//                             }
//                         }
//                         setCourses(updatedCourses);
//                     }
//                     function callback1(res) {
//                         res.json().then(callback2)
//                     }
//                     fetch("http://localhost:3010/admin/courses/" + props.courseId, {
//                         method: "PUT",
//                         body: JSON.stringify({
//                             title: title,
//                             description: description,
//                             imageLink: image,
//                             published: true
//                         }),
//                         headers: {
//                             "Content-type": "application/json",
//                             "Authorization": "Bearer " + localStorage.getItem("token")
//                         }
//                     })
//                         .then(callback1)
//                 }}
//             > Update course</Button>
//         </Card>
//     </div>
// }

// function CourseCard(props) {

//     const courses = useRecoilValue(coursesState)
//     let course = null;
//     for (let i = 0; i < courses.length; i++) {
//         if (courses[i].id == props.courseId) {
//             course = courses[i]
//         }
//     }
//     console.log("coursecard rerendered");

//     if (!course) {
//         return "loading..."
//     }

//     return <div style={{ display: "flex", justifyContent: "center" }}>
//         <Card style={{
//             margin: 10,
//             width: 300,
//             minHeight: 200
//         }}>

//             <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
//             <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
//             <img src={course.imageLink} style={{ width: 300 }} ></img>
//         </Card>
//     </div>
// }

// export default Course;

// const coursesState = atom({
//     key: 'coursesState',
//     default: '',
// });