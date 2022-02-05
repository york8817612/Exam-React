import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { Link as RouteLink } from "react-router-dom";
import agent from '../agent';

import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

export default function CRUDExamList() {
    const [count, setCount] = React.useState(0);
    const [getData, setData] = React.useState([]);
    const [open, setOpen] = React.useState({ isOpen: false, isAdd: false });
    const [tempData, setTempData] = React.useState({ id: '', name: '', enable: true });

    const handleChange = event => {
        setTempData({ id: tempData.id, name: event.target.value, enable: tempData.enable });
    };

    const handleClickOpen = (state) => {
        setOpen({ isOpen: true, isAdd: state });
    };

    const handleClose = (state) => {
        if (!state.isClose) {
            if (state.isAdd) {
                agent.ExamItems.add(tempData.name, tempData.enable).then((res, err) => {
                    if (res) {
                        console.log(res);
                    }
                    if (err) {
                        console.warn(err);
                    }
                })
                console.log(`add-${tempData.id}-${tempData.name}-${tempData.enable}`);
            } else {
                agent.ExamItems.save(tempData).then((res, err) => {
                    if (res) {
                        console.log(res);
                    }
                    if (err) {
                        console.warn(err);
                    }
                })
                console.log(`edit-${tempData.id}-${tempData.name}-${tempData.enable}`);
            }
            // 更新列表
            setCount(count + 1);
        }
        setOpen({ isOpen: false, isAdd: open.isAdd });
    };

    React.useEffect(() => {
        agent.ExamItems.list().then((res, err) => {
            if (res) {
                setData(res);
            }
            if (err) {
                console.warn(err);
            }
        })
    }, [count]);

    // 新增、編輯視窗
    const PostDialog = (isAdd) => (
        <Dialog
            fullScreen
            open={open.isOpen}
            onClose={() => handleClose({ isClose: true, isAdd: isAdd })}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => handleClose({ isClose: true, isAdd: isAdd })}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {isAdd ? '新增' : '編輯'}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={() => handleClose({ isClose: false, isAdd: isAdd })}>
                        {isAdd ? '建立' : '儲存'}
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
                        {isAdd ? '新增' : '編輯'}
                    </Typography>
                </Box>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        id="examname"
                        margin="normal"
                        required
                        fullWidth
                        label="考試項目名稱"
                        value={tempData.name}
                        variant="standard"
                        autoFocus
                        onChange={handleChange}
                    />
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked />} label="開啟" />
                    </FormGroup>
                    <Divider />
                </Box>
            </Container>
        </Dialog>
    );

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        <MenuBookIcon color="primary" sx={{ fontSize: 40 }} /> 考試項目列表
                    </Typography>
                </Grid>
                <Grid item xs={4} align="right">
                    <IconButton color="success" onClick={() => setCount(count + 1)}>
                        <CachedIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Table>
                <TableBody>
                    {getData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" color="error" startIcon={<CreateIcon />} onClick={() => {
                                    handleClickOpen(false);
                                    setTempData(row);
                                }} >
                                    編輯
                                </Button>
                                <Button variant="outlined" color="success" startIcon={<CreateIcon />} component={RouteLink} to={`/admin/exam/${row.id}`} >
                                    題目
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {PostDialog(open.isAdd)}
            <Fab sx={fabStyle} color="primary" aria-label="add" onClick={() => handleClickOpen(true)}>
                <AddIcon />
            </Fab>
        </React.Fragment>
    );
}

