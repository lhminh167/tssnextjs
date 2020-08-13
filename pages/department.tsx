import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import DepartmentListComponent from '../modules/department/list/department-list.component';
import { getDepartments } from '../modules/department/department.service';
import { IDepartment } from '../modules/shared/models/department.model';
import { Container } from '@material-ui/core';
import ErrorBoundary from '../modules/shared/error-boundary/error-boundary.component';
import { DepartmentListMetadataComponent } from '../modules/department/list/department-list-metadata.component';

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
    return (
        <Container>
            <ErrorBoundary>
                <DepartmentListComponent
                    data={data}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <DepartmentListMetadataComponent
                />
            </ErrorBoundary>
        </Container>
    );
}

export async function getStaticProps() {

    const response: any = await getDepartments();

    return {
        props: { data: response.content },
        revalidate: null
    }
}