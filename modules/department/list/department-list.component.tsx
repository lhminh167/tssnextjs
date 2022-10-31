import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import Link from "next/link";
import { ChangeEvent, Fragment, useState } from "react";
import CategoryListComponent from "../../category/list/category-list.component";
import { mb } from "../../shared/layout/layout.style";
import { IDepartment } from "../../shared/models/department.model";
import { DEPARTMENT, DESCRIPTION, NAME, tag } from "../../shared/tag/tag.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mb: mb,
  })
);

interface IProps {
  data: IDepartment[];
}

export default function DepartmentListComponent({ data }: IProps) {
  const classes = useStyles({});
  return (
    <Grid container>
      <Grid item xs={12} className={classes.mb}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link href="/" as="/" passHref>
            <Typography component="a" color="inherit">
              Home
            </Typography>
          </Link>
          <Typography color="textPrimary">Department</Typography>
        </Breadcrumbs>
      </Grid>
      <DepartmentOverviewComponent data={data} />
    </Grid>
  );
}

interface DepartmentListProps {
  data: IDepartment[];
}

function DepartmentOverviewComponent({ data }: DepartmentListProps) {
  const [expanded, setExpanded] = useState<number | false>(false);
  const handleChange =
    (panelId: number) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelId : false);
    };
  return (
    <Fragment>
      {data.map((entry) => (
        <Grid item xs={12} key={entry.departmentId}>
          <Accordion
            expanded={expanded === entry.departmentId}
            onChange={handleChange(entry.departmentId)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="h6"
                component="h2"
                data-cy={tag(NAME, entry.departmentId, DEPARTMENT)}
              >
                {entry.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    data-cy={tag(DESCRIPTION, entry.departmentId, DEPARTMENT)}
                  >
                    {entry.description}
                  </Typography>
                </Grid>
                <CategoryListComponent data={entry.category} />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Fragment>
  );
}
