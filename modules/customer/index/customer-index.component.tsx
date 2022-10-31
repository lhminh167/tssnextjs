import EditIcon from "@mui/icons-material/Edit";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ListItemIcon, Paper, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { Fragment } from "react";
import { getCustomerIdNumberFromLoginToken } from "../../shared/helpers/auth.helper";
import { DETAIL, EDIT, NEW_PASSWORD } from "../../shared/tag/tag.model";

export default function CustomerIndexComponent(props: any) {
  const userId = getCustomerIdNumberFromLoginToken();

  return (
    <Fragment>
      <Typography component="h1" variant="h6" gutterBottom>
        User Area
      </Typography>
      <List component={Paper}>
        <Link
          href={{
            pathname: "/user/[userId]",
          }}
          as={`/user/${userId}`}
          passHref
        >
          <ListItem button component="a" data-cy={DETAIL}>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>

            <ListItemText primary="View Account" />
          </ListItem>
        </Link>
        <Link
          href={{
            pathname: "/user/[userId]/edit",
          }}
          as={`/user/${userId}/edit`}
          passHref
        >
          <ListItem button component="a" data-cy={EDIT}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>

            <ListItemText primary="Edit Account" />
          </ListItem>
        </Link>
        <Link
          href={{
            pathname: "/user/[userId]/change-password",
          }}
          as={`/user/${userId}/change-password`}
          passHref
        >
          <ListItem button component="a" data-cy={NEW_PASSWORD}>
            <ListItemIcon>
              <LockOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary="Change Password" />
          </ListItem>
        </Link>
      </List>
    </Fragment>
  );
}
