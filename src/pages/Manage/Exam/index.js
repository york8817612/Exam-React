import * as React from 'react';
import agent from '../../../agent';
import { ACTION_NONE, ACTION_ADD, ACTION_REMOVE, ACTION_EDIT } from '../constants';
import List from './components/List';
import AEDialog from './components/AEDialog';


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

function fetchPostData(getSelectData) {
    agent.ExamItems.add(getSelectData.name, getSelectData.enable).then((res, err) => {
        if (res) {
            console.log(res);
        }
        if (err) {
            console.warn(err);
        }
    })
}

function fetchDeleteData(setData) {
    agent.ExamItems.list().then((res, err) => {
        if (res) {
            setData(res);
        }
        if (err) {
            console.warn(err);
        }
    })
}

function fetchPutData(getSelectData) {
    agent.ExamItems.save(getSelectData).then((res, err) => {
        if (res) {
            console.log(res);
        }
        if (err) {
            console.warn(err);
        }
    })
}

const Exam = () => {
    const [getData, setData] = React.useState([]);
    const [getSelectData, setSelectData] = React.useState([]);
    const [getOpen, setOpen] = React.useState({ isOpen: false, isAdd: false });
    const submittingStatus = React.useRef(ACTION_NONE);

    // getSelectData及submittingStatus更動時更新
    React.useEffect(() => {
        switch (submittingStatus.current) {
            case ACTION_ADD:
                console.log('getSelectData is added');
                fetchPostData(getSelectData);
                break;
            case ACTION_REMOVE:
                console.log('getSelectData is removed');
                fetchDeleteData(getSelectData);
                break;
            case ACTION_EDIT:
                console.log('getSelectData is edited');
                fetchPutData(getSelectData);
                break;
            default:
                console.log('getSelectData is change');
                return;
        }
        fetchGetData(setData);
        submittingStatus.current = ACTION_NONE;
    }, [getSelectData])

    // 頁面重新整理時執行
    React.useEffect(() => {
        fetchGetData(setData)
    }, []);

    return (
        <>
            <List getData={getData} setOpen={setOpen} setSelectData={setSelectData} />
            <AEDialog getOpen={getOpen} setOpen={setOpen} getSelectData={getSelectData} setSelectData={setSelectData} submittingStatus={submittingStatus} />
        </>
    );
}

export default Exam