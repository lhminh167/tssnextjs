import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ListItemIcon, Paper, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { Fragment } from "react";
import { ADD_NEW_PRODUCT } from "../../shared/tag/tag.model";

export default function AdminListComponent() {
  return (
    <Fragment>
      <Typography component="h1" variant="h6" gutterBottom>
        Admin Area
      </Typography>
      <List component={Paper}>
        <Link href="/product/new" as="/product/new" passHref>
          <ListItem button component="a" data-cy={ADD_NEW_PRODUCT}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>

            <ListItemText primary="Add new product" />
          </ListItem>
        </Link>
      </List>
    </Fragment>
  );
}
