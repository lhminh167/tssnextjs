import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import DepartmentListComponent from '../modules/department/list/department-list.component';
import { getDepartments } from '../modules/department/department.service';
import { IDepartment } from '../modules/shared/models/department.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
    data: IDepartment[]
}

export default function DepartmentListPage({
    data
}: Props) {
    const classes = useStyles({});
    return <DepartmentListComponent
        data={data}
    />
}

DepartmentListPage.getInitialProps = async function ({ ctx }) {
    const { query } = ctx;
    const response: any = await getDepartments();
    
    return { data: response.content };
}
