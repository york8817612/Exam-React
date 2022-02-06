import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Slide from '@mui/material/Slide';
import { useParams } from "react-router-dom";
import agent from '../agent';

import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditIcon from '@mui/icons-material/Edit';
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

export default function CRUDQuestionList() {

    let params = useParams();

    const [count, setCount] = React.useState(0);
    const [getData, setData] = React.useState([]);
    const [open, setOpen] = React.useState({ isOpen: false, isAdd: false });
    const [tempData, setTempData] = React.useState({ id: '', examItemId: params.id, questionType: 0, text: '', anwserItems: [] });

    const handleTextChange = event => {
        setTempData({ id: tempData.id, examItemId: tempData.examItemId, questionType: tempData.questionType, text: event.target.value, anwserItems: tempData.anwserItems });
    };

    const handleAnwserTextChange = (index, event) => {
        let anwserItems = tempData.anwserItems;
        anwserItems[index].text = event.target.value;
        setTempData({ id: tempData.id, examItemId: tempData.examItemId, questionType: tempData.questionType, text: tempData.text, anwserItems: anwserItems });
    };

    const handleAnwserCorrectChange = (index, event) => {
        let anwserItems = tempData.anwserItems;
        anwserItems[index].correct = event.target.value;
        setTempData({ id: tempData.id, examItemId: tempData.examItemId, questionType: tempData.questionType, text: tempData.text, anwserItems: anwserItems });
    };

    const handleTypeChange = event => {
        setTempData({ id: tempData.id, examItemId: tempData.examItemId, questionType: event.target.value, text: tempData.text, anwserItems: tempData.anwserItems });
    };

    const handleClickOpen = (state) => {
        setOpen({ isOpen: true, isAdd: state });
        if (state) {
            setTempData({ id: tempData.id, examItemId: tempData.examItemId, questionType: tempData.questionType, text: tempData.text, anwserItems: [] });
        }
    };

    const handleSelectSpeedDial = () => {
        let anwserItems = tempData.anwserItems;
        anwserItems.push({ text: '', correct: '' });
        setTempData({ id: tempData.id, examItemId: tempData.examItemId, questionType: tempData.questionType, text: tempData.text, anwserItems: anwserItems });
        console.log(anwserItems);
    };

    const handleClose = (state) => {
        if (!state.isClose) {
            if (state.isAdd) {
                agent.QuestionItems.add(tempData.examItemId, tempData.questionType, tempData.text, tempData.anwserItems).then((res, err) => {
                    if (res) {
                        console.log(res);
                    }
                    if (err) {
                        console.warn(err);
                    }
                })
                console.log(`add-${tempData.id}-${tempData.name}-${tempData.enable}`);
            } else {
                agent.QuestionItems.save(tempData).then((res, err) => {
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
        agent.QuestionItems.list(params.id).then((res, err) => {
            if (res) {
                setData(res);
            }
            if (err) {
                console.warn(err);
            }
        })
    }, [params.id, count]);

    const actions = [
        { icon: <CloseIcon />, name: 'Copy' },
        { icon: <CloseIcon />, name: 'Save' },
        { icon: <CloseIcon />, name: 'Print' },
        { icon: <CloseIcon />, name: 'Share' },
    ];

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
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">題目類型</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tempData.questionType}
                            label="題目類型"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={0}>是非題</MenuItem>
                            <MenuItem value={1}>選擇題</MenuItem>
                            <MenuItem value={2}>複選題</MenuItem>
                            <MenuItem value={3}>拖曳題</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="questiontext"
                        margin="normal"
                        required
                        fullWidth
                        label="題目內容"
                        multiline
                        minRows={4}
                        value={tempData.text}
                        autoFocus
                        onChange={handleTextChange}
                    />
                    <Divider />
                    {tempData.anwserItems.map((aitem, index) => (
                        <Paper
                            key={`anwser${index}`}
                            component="form"
                            sx={{ p: '2px 4px', m: '4px', display: 'flex', alignItems: 'center' }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                required
                                multiline
                                value={aitem.text}
                                placeholder="題目選項"
                                onChange={() => handleAnwserTextChange(index, event)}
                                inputProps={{ 'aria-label': '題目選項' }}
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <InputBase
                                sx={{ ml: 1, flex: 1, w: '50px' }}
                                required
                                value={aitem.correct}
                                placeholder="答案"
                                onChange={() => handleAnwserCorrectChange(index, event)}
                                inputProps={{ 'aria-label': '答案' }}
                            />
                            <Divider />
                        </Paper>
                    ))}
                </Box>
            </Container>
            <Box sx={fabStyle, { height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={handleSelectSpeedDial}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </Dialog>
    );

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        <MenuBookIcon color="primary" sx={{ fontSize: 40 }} /> 考試題目列表
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
                            <TableCell>{row.text}</TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" color="error" startIcon={<CreateIcon />} onClick={() => {
                                    handleClickOpen(false);
                                    setTempData(row);
                                }} >
                                    編輯
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

