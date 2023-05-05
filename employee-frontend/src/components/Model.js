import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import EmployeeForm from "./EmployeeForm";
import './model.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid dark-grey',
    boxShadow: 24,
    p: 5,
    borderRadius: '5px'
};

export default function TransitionsModal(props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const setResults = (results) => {
    //     console.log("TransitionsModal : ", results);
    //     props.results(results);
    // };


    const fetchData = () => {
        props.getEmp();
    };

    return (
        <div>
            <div>
                <Button
                    onClick={handleOpen}
                    variant="contained"
                    className={'btn-emp'}
                >
                    Add Employee
                </Button>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}

            >
                <Fade in={open}>
                    <Box sx={style}>
                        {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="transition-modal-description" sx={{mt: 2}}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>*/}
                        <EmployeeForm setClose={handleClose} fetchData={fetchData}/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}