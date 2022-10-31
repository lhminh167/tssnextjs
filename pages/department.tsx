import Container from "@mui/material/Container";
import { getDepartments } from "../modules/department/department.service";
import { DepartmentListMetadataComponent } from "../modules/department/list/department-list-metadata.component";
import DepartmentListComponent from "../modules/department/list/department-list.component";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import { IDepartment } from "../modules/shared/models/department.model";

interface Props {
  // #region Properties (1)

  data: IDepartment[];

  // #endregion Properties (1)
}

export default function DepartmentListPage({ data }: Props) {
  return (
    <Container>
      <ErrorBoundary>
        <DepartmentListComponent data={data} />
      </ErrorBoundary>
      <ErrorBoundary>
        <DepartmentListMetadataComponent />
      </ErrorBoundary>
    </Container>
  );
}

export async function getStaticProps() {
  const response: any = await getDepartments();

  return {
    props: { data: response.content },
    revalidate: 86400,
  };
}
