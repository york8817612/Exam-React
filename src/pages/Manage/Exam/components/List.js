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

import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

const List = (getData, setOpen, setSelectData) => {
    
    const handleClickOpen = (state, item) => {
        setOpen({ isOpen: true, isAdd: state });
        if (state) {
            setSelectData({ name:'', enable: '' });
        } else {
            setSelectData(item);
        }
    };
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
                                    handleClickOpen(false, row);
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
            <Fab sx={fabStyle} color="primary" aria-label="add" onClick={() => handleClickOpen(true, {})}>
                <AddIcon />
            </Fab>
        </React.Fragment>
    )
}

export default List