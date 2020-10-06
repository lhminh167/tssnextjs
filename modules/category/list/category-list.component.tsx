import { createStyles, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Link from 'next/link';
import { Fragment } from 'react';
import { categoryUrl, ICategory } from '../../shared/models/category.model';
import { CATEGORY, tag, LINK, NAME } from '../../shared/tag/tag.model';

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
                                data-cy={tag(LINK, entry.categoryId, CATEGORY)}
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
                                    data-cy={tag(NAME, entry.categoryId, CATEGORY)}
                                />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Grid>
        </Fragment>
    );
}