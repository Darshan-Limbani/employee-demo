import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Avatar, CircularProgress} from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from "react";
import {useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// const TableHead = withStyles(theme => ({
//     root: {
//         backgroundColor: 'orange'
//     }
// }))(MuiTableHead);
//
// const TableHeaderCell = withStyles(theme => ({
//     root: {
//         color: 'white'
//     }
// }))(TableCell);


const columns = [
    {
        id: 'first_name',
        label: 'First Name'
    },
    {
        id: 'last_name',
        label: 'Last Name'
    },
    {
        id: 'post',
        label: 'Post'
    },
    {
        id: 'email',
        label: 'Email'
    },
    {
        id: 'mobile',
        label: 'Mobile Number',
        minWidth: 100
    }];

// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
export default function EmployeeTable({page, length, rowsPerPage, employee, setRowsPerPage, setPage, getEmp}) {

    const [showLoader, setShowLoader] = useState(false);
    // const [employee, setEmployee] = useState([]);
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(5);
    // const [length, setLength] = useState(0);

    /*async function getEmp() {
        const res = await fetch(`http://localhost:3000/employee?page=${page + 1}&limit=${rowsPerPage}`);
        const data = await res.json();
        if (res.ok) {
            // return {results, data};
            console.log("data from fetch----------------------->", data);
            setEmployee(data.data.employee);
            setLength(data.results);
        } else {
            console.log("RESPONSE : --->", data);
            toast('Something went Wrong....');
        }
    }*/

    // props.fetchEmploye


    /*
        useEffect(() => {

            console.log("USE EFFECT CALLED");

            // getEmp();

            /!* getEmp().then(data => {
                 setLength(props.totalResults ? props.totalResults : data.results);
                 // setLength(data.results);
                 setEmployee(data.data.employee);
             }).catch(err => {
                 console.log("ERROR FETCHING EMPLOYEE : ", err);
             });*!/

        }, [page, rowsPerPage ]);
    */

    // setLength(props.totalResults);

    /*    useCallback(
            () => {
                async function getEmp() {
                    return await API.getAllEmployee(page, rowsPerPage);
                }

                getEmp().then(data => {
                    setLength(data.results);
                    setEmployee(data.data.employee);
                }).catch(err => {
                    console.log("ERROR FETCHING EMPLOYEE : ", err);
                });
            },
            [employee],
        );*/


    const handleChangePage = (event, newPage) => {
        console.log("handleChangePage newPage:", newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        console.log("setRowsPerPage newPage:", event.target.value);

        setPage(0);
    };

    const handleDeleteEmployee = async (id) => {
        const res = await fetch(`http://localhost:3000/employee/${id}`, {
            method: "DELETE"
        });
        // const data = await res.json();
        if (!res.ok) {
            // console.log(data);
            toast.error("Something went wrong!!");

        } else {
            getEmp();
            toast.success("Employee data deleted successfully!!");
        }
    };

    console.log(" --------------------------->", employee);

    return (
        <Paper sx={{width: '80%', overflow: 'hidden'}}>
            <TableContainer sx={{width: '100%', maxHeight: '85vh'}} component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Profile</TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employee && employee
                            .map((emp, index) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={index}>
                                        <TableCell>
                                            <Avatar
                                                src={emp.profile ? emp.profile : ""}>{emp.first_name ? emp.first_name[0] : ""}</Avatar>
                                        </TableCell>

                                        {columns.map((column) => {
                                            const value = emp[column.id];
                                            return (<TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>);
                                        })
                                        }
                                        <TableCell align={"left"}>
                                            {showLoader
                                                ? <CircularProgress/>
                                                : <DeleteForeverIcon
                                                    onClick={handleDeleteEmployee.bind(null, emp._id)}/>
                                            }</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25, 50]}
                component="div"
                count={length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // sx={{bottom: "0", position: "fixed"}}
            />
        </Paper>

    );
}