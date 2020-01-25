import { createStyles, makeStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import DeleteIcon from '@material-ui/icons/Delete';
import ForumIcon from '@material-ui/icons/Forum';
import InfoIcon from '@material-ui/icons/Info';
import Label from '@material-ui/icons/Label';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MailIcon from '@material-ui/icons/Mail';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TreeView from '@material-ui/lab/TreeView';
import React, { Fragment } from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import theme, { themeColor } from '../layout/layout.theme';
import { Typography, Container, Avatar, Grid, Paper, Box } from '@material-ui/core';
import { SidebarTreeItemLabelComponent } from './sidebar-tree-item-label.component';
import Link from 'next/link';

const sidebarContentTheme = createMuiTheme({
    ...theme,
    overrides: {
        // @ts-ignore
        MuiTreeView: {
            root: {
                maxWidth: 400,
                minWidth: 250,
                padding: theme.spacing(1, 0)
            }
        },
        // @ts-ignore
        MuiTreeItem: {
            content: {
                padding: theme.spacing(1),
                flexDirection: 'row-reverse',
                borderRadius: theme.spacing(0.5),
            },
            label: {
                fontWeight: 'inherit',
                color: 'inherit',
            }
        },
    },
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        primaryText: {
            color: themeColor.primary
        },
        login: {
            marginLeft: theme.spacing(1)
        },
        seperator: {
            margin: theme.spacing(0,1)
        }

    })
);

interface ITreeViewProps {
    onClose: any;
}

function SideBarContentComponent(props: ITreeViewProps) {
    const classes = useStyles({});
    const { onClose } = props;
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const closeSideBar = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            (
                (event as React.KeyboardEvent).key === 'Tab'
                || (event as React.KeyboardEvent).key === 'Shift'
            )
        ) return;

        onClose();
    };

    return (
        <ThemeProvider theme={sidebarContentTheme}>
            <TreeView
                defaultCollapseIcon={<ArrowDropUpIcon />}
                defaultExpandIcon={<ArrowDropDownIcon />}
            >
                <TreeItem nodeId="2"
                    label={
                        <SidebarTreeItemLabelComponent
                            Icon={<Avatar alt="Username" src="/static/images/avatar/1.jpg" />}
                            Title={
                                <Grid container direction="row">
                                    <Grid item className={classes.login+' '+classes.primaryText}>
                                        <Link href="/login" as="/login" passHref>
                                            <Typography
                                                variant="body2"
                                            >
                                                Login
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item 
                                        className={classes.seperator}
                                    >
                                        {/* &nbsp;or&nbsp; */}
                                        |
                                    </Grid>
                                    <Grid item className={classes.primaryText}>
                                        <Link href="/register" as="/register" passHref>
                                            <Typography
                                                variant="body2"
                                            >
                                                Register
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                            }
                        />
                    }
                />
                <TreeItem nodeId="1"
                    label={
                        <SidebarTreeItemLabelComponent
                            Title="Mail"
                            Icon={<MailIcon />}
                        />
                    }
                >
                    <TreeItem nodeId="2" label="Calendar" />
                    <TreeItem nodeId="3" label="Chrome" />
                    <TreeItem nodeId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="6" label="Material-UI">
                        <TreeItem nodeId="7" label="src">
                            <TreeItem nodeId="8"
                                label={
                                    <SidebarTreeItemLabelComponent
                                        Title="Mail"
                                        Icon={MailIcon}
                                    />
                                }
                            />
                            <TreeItem nodeId="9" label="tree-view.js" />
                        </TreeItem>
                    </TreeItem>
                </TreeItem>
            </TreeView>
        </ThemeProvider>
    );
}

export default SideBarContentComponent;