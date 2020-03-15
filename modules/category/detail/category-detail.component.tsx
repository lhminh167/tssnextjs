import { Breadcrumbs, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "next/link";
import { ChangeEvent, Fragment, useState, useEffect } from "react";
import { ICategory } from "../../shared/models/category.model";
import { getCategory } from "../category.service";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    })
);

interface IProps {
    data: any,
}

export default function CategoryDetailComponent(props: IProps) {
    const classes = useStyles({});
    const { data } = props;
    // const [state, setState] = useState<ICategory>(defaultCategory);
    // const router = r
    useEffect(() => {
        getCategory(data.cate)
    }

    )

    const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
        // setExpanded(isExpanded ? panel : false);
    };

    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12}>
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
                        <Link
                            href="/"
                            passHref
                        >
                            <Typography
                                component="a"
                                color="inherit"
                            >
                                Category
                            </Typography>
                        </Link>
                        <Link
                            href="/"
                            passHref
                        >
                            <Typography
                                component="a"
                                color="inherit"
                            >

                            </Typography>
                        </Link>
                        <Typography color="textPrimary">Department</Typography>
                    </Breadcrumbs>
                </Grid>

            </Grid>
        </Fragment>
    );
}
