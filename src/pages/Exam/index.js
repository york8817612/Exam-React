import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link as RouteLink } from "react-router-dom";
import agent from '../../agent';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';

const ExamList = () => {
    const [count, setCount] = React.useState(0);
    const [getData, setData] = React.useState([]);

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

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        <MenuBookIcon color="primary" sx={{ fontSize: 40 }} /> 考試列表
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
                                <Button variant="outlined" color="error" startIcon={<CreateIcon />} component={RouteLink} to={`/exam/${row.id}`}>
                                    開始考試
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default ExamList