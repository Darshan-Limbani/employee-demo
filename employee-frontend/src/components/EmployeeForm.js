import {Avatar, FormControl, FormGroup, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import * as React from "react";
import {useState} from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {storage} from "../firebase/firebaseConfig";


const INITIAL_STATE = {
    profile: "",
    first_name: "",
    last_name: "",
    post: "",
    email: "",
    mobile: ""
};


const EmployeeForm = (props) => {

    const [percent, setPercent] = useState(0);
    const [employeeData, setEmployeeData] = useState(INITIAL_STATE);

    async function addEmployee(empData) {
        const res = await fetch(`http://localhost:3000/employee`, {
            method: "POST",
            body: JSON.stringify(empData),
            headers: {
                'content-type': 'application/json'
            }
        });
        const data = await res.json();
        console.log(res);
        console.log(res.ok);
        console.log(res.status);
        if (!res.ok) {
            console.log("if.................", data);
            if (data.error === 11000) {
                console.log("ERROR");
                return toast.error(`${data.message.toLowerCase().includes('email') ? 'Email ID' : 'Mobile Number'} already exists`, {
                    autoClose: 3000,
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } else {
            toast.success("Employee Added successfully!!", {autoClose: 3000, position: toast.POSITION.TOP_CENTER});
            console.log("Employee Added successfully", data);
            props.fetchData();
            props.setClose(true);
        }

        return data.results;
    }

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => toast.error('Something went wrong while uploading Profile Picture!!', {autoClose: 3000}),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log("AVATAR URL : ------------->", url);
                    setEmployeeData({...employeeData, profile: url});
                });
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const add = async () => {
            await addEmployee(employeeData);
        };

        try {
            add().then();
            // props.total(results);
        } catch (err) {
            console.log("ERROR:------>", err);
        }
    };

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setEmployeeData({...employeeData, [name]: value});
        console.log(employeeData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{
                display: "flex",
                fontSize: "x-large",
                fontWeight: "bold",
                color: "ghostwhite",
                background: "#2e7fce",
                justifyContent: "center",
                marginTop: "0px",
                height: "70px",
                alignItems: 'center',
                borderRadius: "5px"
            }} className={'form-header'}>
                Add Employee
            </div>
            <div style={{
                border: "1px solid #2e7fce",
                borderRadius: "5px",
                marginTop: "8px",
                padding: "10px 2px"
            }}>
                <FormGroup>

                    <FormControl sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "5px"
                    }}>
                        <Avatar></Avatar>
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{
                                margin: "5px",
                            }}
                        >
                            {percent === 0 ? <p> Add Profile Picture</p> : percent > 0 ?
                                <p> {percent} "% done"</p> : ""}
                            <input
                                required
                                type="file"
                                hidden
                                accept="/image/*"
                                onChange={handleUpload}
                            />
                        </Button>
                    </FormControl>


                    <TextField
                        id="first_name"
                        sx={{margin: "5px"}}
                        required
                        variant={"outlined"}
                        name={"first_name"}
                        label={"First Name"}
                        value={employeeData.first_name}
                        onChange={changeHandler}
                    />

                    <TextField
                        id="last_name"
                        sx={{margin: "5px"}}
                        required
                        name={"last_name"}
                        label={"Last Name"}
                        value={employeeData.last_name}
                        onChange={changeHandler}/>

                    <TextField
                        id="post"
                        sx={{margin: "5px"}}
                        required
                        name={"post"}
                        label={"Post"}
                        value={employeeData.post}
                        onChange={changeHandler}/>

                    <TextField
                        type={'email'}
                        id="email"
                        sx={{margin: "5px"}}
                        required
                        name={"email"}
                        label={"Email"}
                        value={employeeData.email}
                        onChange={changeHandler}/>

                    <TextField
                        id="mobile"
                        sx={{margin: "5px"}}
                        required
                        type={"number"}
                        minLength={10}
                        name={"mobile"}
                        label={"Mobile Number"}
                        value={employeeData.mobile}
                        onChange={changeHandler}/>

                    <Button
                        id={"submit"}
                        variant="contained"
                        sx={{margin: "5px"}}
                        type="submit">
                        Submit
                    </Button>

                </FormGroup>
            </div>
        </form>
    );
};


export default EmployeeForm;