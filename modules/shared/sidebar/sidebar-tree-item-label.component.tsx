import { Typography, makeStyles, Theme, createStyles, SvgIconProps } from "@material-ui/core";
import { ReactNode, ElementType } from "react";
import { TreeItemProps } from "@material-ui/lab/TreeItem";
import { title } from "process";
import { string } from "prop-types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        labelRoot: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0.5, 0),
        },
        labelIcon: {
            marginRight: theme.spacing(1),
        },
        labelText: {
            fontWeight: 'inherit',
            flexGrow: 1,
        },

    })
);

interface ISidebarTreeItemLabelProps {
    Icon: any;
    Title: any;
};

export function SidebarTreeItemLabelComponent(props: ISidebarTreeItemLabelProps) {
    const classes = useStyles({});
    const {Title, Icon } = props;

    return (
        <div
            className={classes.labelRoot}
        >
            {Icon}
            
            <Typography
                variant="body2"
                className={classes.labelText}
            >
               {Title}
            </Typography>
        </div>
    );
}