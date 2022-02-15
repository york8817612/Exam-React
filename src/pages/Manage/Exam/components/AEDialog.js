import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { ACTION_ADD, ACTION_EDIT } from '../../constants';

import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AEDialog = (getOpen, setOpen, getSelectData, setSelectData, submittingStatus) => {

    const handleNameChange = event => {
        let tempData = getSelectData;
        tempData.name = event.target.value;
        setSelectData(tempData);
    };

    const handleEnableChange = event => {
        let tempData = getSelectData;
        tempData.name = event.target.value;
        setSelectData(tempData);
    };
    
    const handleClose = (state) => {
        if (!state.isClose) {
            if (state.isAdd) {
                submittingStatus.current = ACTION_ADD;
            } else {
                submittingStatus.current = ACTION_EDIT;
            }
        }
        setOpen({ isOpen: false, isAdd: open.isAdd });
    };

    return (
        <Dialog
            fullScreen
            open={getOpen.isOpen}
            onClose={() => handleClose({ isClose: true, isAdd: getOpen.isAdd })}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => handleClose({ isClose: true, isAdd: getOpen.isAdd })}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {getOpen.isAdd ? '新增' : '編輯'}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={() => handleClose({ isClose: false, isAdd: getOpen.isAdd })}>
                        {getOpen.isAdd ? '建立' : '儲存'}
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <CreateIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {getOpen.isAdd ? '新增' : '編輯'}
                    </Typography>
                </Box>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        id="examname"
                        margin="normal"
                        required
                        fullWidth
                        label="考試項目名稱"
                        value={getSelectData.name}
                        variant="standard"
                        autoFocus
                        onChange={handleNameChange}
                    />
                    <FormGroup>
                        <FormControlLabel control={<Switch value={getSelectData.enable} onClick={handleEnableChange} />} label="開啟" />
                    </FormGroup>
                    <Divider />
                </Box>
            </Container>
        </Dialog>
    );
}

export default AEDialog