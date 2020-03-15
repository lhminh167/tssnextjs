import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../modules/root/root.model';
import DepartmentListComponent from '../modules/department/list/department-list.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

function DepartmentPage(props) {
    const classes = useStyles(props);
    return <DepartmentListComponent />
}

DepartmentPage.getInitialProps = function ({ }) {
}

export default DepartmentPage;
