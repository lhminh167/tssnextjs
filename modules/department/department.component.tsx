import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Fragment, useState, ChangeEvent } from "react";
import ProductFilterProductList from "../product-filter/product-list/product-list.component";
import { IProductFilterState } from "../product-filter/product-filter.model";
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Breadcrumbs } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        heading: {
            // fontSize: theme.typography.pxToRem(15),
            // fontWeight: theme.typography.fontWeightRegular,
        },

    })
);



interface IProps {
    data: IProductFilterState,
}

function DepartmentComponent(props: IProps) {
    const classes = useStyles({});
    const { data } = props;
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Fragment>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                        <Link href="/">
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
                <Grid item xs={12}>
                    <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>General settings</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                maximus est, id dignissim quam.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography className={classes.heading}>Users</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                                diam eros in elit. Pellentesque convallis laoreet laoreet.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography className={classes.heading}>Advanced settings</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                vitae egestas augue. Duis vel est augue.
          </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography className={classes.heading}>Personal data</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                vitae egestas augue. Duis vel est augue.
          </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </Grid>
            </Grid>
        </Fragment>
    );
}

export default DepartmentComponent;
