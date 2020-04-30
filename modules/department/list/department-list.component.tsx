import { Breadcrumbs, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "next/link";
import { ChangeEvent, Fragment, useState } from "react";
import CategoryListComponent from "../../category/list/category-list.component";
import { mb } from "../../shared/layout/layout.style";
import { IDepartment } from "../../shared/models/department.model";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mb: mb
    })
);

interface IProps {
    data: IDepartment[],
}

export default function DepartmentListComponent({
    data
}: IProps) {
    const classes = useStyles({});
    return (
        <Grid container>
            <Grid
                item
                xs={12}
                className={classes.mb}
            >
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link
                        href="/"
                        as='/'
                        passHref
                    >
                        <Typography
                            component="a"
                            color="inherit"
                        >
                            Home
                        </Typography>
                    </Link>
                    <Typography color="textPrimary">Department</Typography>
                </Breadcrumbs>
            </Grid>
            <DepartmentOverviewComponent
                data={data}
            />
        </Grid>
    );
}

interface DepartmentListProps {
    data: IDepartment[];
}

function DepartmentOverviewComponent({
    data
}: DepartmentListProps) {
    const [expanded, setExpanded] = useState<number | false>(false);
    const handleChange = (panelId: number) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panelId : false);
    };
    return (
        <Fragment>
            {
                data.map(entry => (
                    <Grid
                        item
                        xs={12}
                        key={entry.departmentId}
                    >
                        <ExpansionPanel
                            expanded={expanded === entry.departmentId}
                            onChange={handleChange(entry.departmentId)}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography
                                    variant="h6"
                                    component="h2"
                                >
                                    {entry.name}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                    >
                                        <Typography
                                            variant='subtitle2'
                                        >
                                            {entry.description}.
                                    </Typography>
                                    </Grid>
                                    <CategoryListComponent
                                        data={entry.category}
                                    />
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                ))
            }
        </Fragment>
    )
}
