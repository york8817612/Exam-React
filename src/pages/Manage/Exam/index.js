import * as React from 'react';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Link as RouteLink } from "react-router-dom";
import AEDialog from './components/AEDialog';
import agent from '../agent';
import { NONE, ADD, REMOVE, EDIT } from '../../../global/actionTypes'

import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

function fetchGetData(setData) {
    agent.ExamItems.list().then((res, err) => {
        if (res) {
            setData(res);
        }
        if (err) {
            console.warn(err);
        }
    })
}

function fetchPostData(setData) {
    agent.ExamItems.list().then((res, err) => {
        if (res) {
            setData(res);
        }
        if (err) {
            console.warn(err);
        }
    })
}

function fetchDelData(setData) {
    agent.ExamItems.list().then((res, err) => {
        if (res) {
            setData(res);
        }
        if (err) {
            console.warn(err);
        }
    })
}

function fetchPutData(setData) {
    agent.ExamItems.list().then((res, err) => {
        if (res) {
            setData(res);
        }
        if (err) {
            console.warn(err);
        }
    })
}

const Exam = () => {
    const [getData, setData] = React.useState([]);
    const [getOpen, setOpen] = React.useState({ isOpen: false, isAdd: false });
    const submittingStatus = React.useRef(NONE);

    const handleClickOpen = (state) => {
        setOpen({ isOpen: true, isAdd: state });
    };

    // getData更動時更新
    React.useEffect(() => {
        switch (submittingStatus.current) {
            case ADD:
                fetchPostData();
                break;
            case REMOVE:
                fetchDelData();
                break;
            case EDIT:
                fetchPutData();
                break;
            default:
                return;
        }
        submittingStatus.current = NONE;
    }, [getData])

    // 頁面重新整理時執行
    React.useEffect(() => {
        fetchGetData(setData)
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        <MenuBookIcon color="primary" sx={{ fontSize: 40 }} /> 考試項目列表
                    </Typography>
                </Grid>
                <Grid item xs={4} align="right">
                    <IconButton color="success">
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
            <Fab sx={fabStyle} color="primary" aria-label="add" onClick={() => handleClickOpen(true)}>
                <AddIcon />
            </Fab>
        </React.Fragment>
    );
}

export default Exam