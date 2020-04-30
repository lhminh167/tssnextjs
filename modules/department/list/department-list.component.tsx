import { Breadcrumbs, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "next/link";
import { ChangeEvent, Fragment, useState } from "react";
import { toUrl } from "../../shared/helpers/string.helper";
import { ICategory } from "../../shared/models/category.model";
import { IDepartment } from "../../shared/models/department.model";
import CategoryListComponent from "../../category/list/category-list.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            >
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link
                        href="/"
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
                        <ExpansionPanel expanded={expanded === entry.departmentId} onChange={handleChange(entry.departmentId)}>
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

// interface CategoryListProps {
//     data: ICategory[];
// }

// function CategoryListComponent({
//     data
// }: CategoryListProps) {
//     const classes = useStyles({});

//     return (
//         <Fragment>
//             <Grid
//                 item
//                 xs={12}
//                 className={classes.mt}
//             >
//                 <Typography
//                     variant="subtitle1"
//                     component="h3"
//                 >
//                     Categories in this department:
//                 </Typography>
//             </Grid>
//             <Grid
//                 item
//                 xs={12}
//             >
//                 <List component="nav" >
//                     {data.map(entry => (
//                         <Link
//                             key={entry.categoryId}
//                             href={'/category/[categoryName]'}
//                             as={`/category/${toUrl(entry.name)}?categoryId=${entry.categoryId}`}
//                             passHref
//                         >
//                             <ListItem
//                                 button
//                                 component="a"
//                             >
//                                 <ListItemIcon
//                                 >
//                                     <ArrowForwardIosIcon
//                                         fontSize='small'
//                                         color="primary"
//                                     />
//                                 </ListItemIcon>
//                                 <ListItemText
//                                     primary={entry.name}
//                                     primaryTypographyProps={{
//                                         variant: 'subtitle2',
//                                         color: "primary"
//                                     }}
//                                 />
//                             </ListItem>
//                         </Link>
//                     ))}
//                 </List>
//             </Grid>
//         </Fragment>
//     );
// }