import { ICategory, categoryUrl } from '../../shared/models/category.model';
import { Fragment } from 'react';
import { Grid, Typography, List, ListItem, ListItemIcon, ListItemText, createStyles, makeStyles, Theme } from '@material-ui/core';
import { toUrl } from '../../shared/helpers/string.helper';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mt: {
            marginTop: theme.spacing(2)
        }
    })
);

interface CategoryListProps {
    data: ICategory[];
}

export default function CategoryListComponent({
    data
}: CategoryListProps) {
    const classes = useStyles({});

    return (
        <Fragment>
            <Grid
                item
                xs={12}
                className={classes.mt}
            >
                <Typography
                    variant='subtitle1'
                    component='h3'
                >
                    Categories in this department:
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <List component='nav' >
                    {data.map(entry => (
                        <Link
                            key={entry.categoryId}
                            href={categoryUrl.detail(entry).href}
                            as={categoryUrl.detail(entry).as}
                            passHref
                        >
                            <ListItem
                                button
                                component='a'
                            >
                                <ListItemIcon
                                >
                                    <ArrowForwardIosIcon
                                        fontSize='small'
                                        color='primary'
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={entry.name}
                                    primaryTypographyProps={{
                                        variant: 'subtitle2',
                                        color: 'primary'
                                    }}
                                />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Grid>
        </Fragment>
    );
}