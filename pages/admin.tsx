import { createStyles, makeStyles, Theme, Container } from "@material-ui/core";
import AdminListComponent from "../modules/admin/list/admin-list.component";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import { AdminListMetadataComponent } from "../modules/admin/list/admin-list-metadata.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function AdminListPage(props) {
    const classes = useStyles({});
    return (
        <Container>
            <ErrorBoundary>
                <AdminListComponent
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <AdminListMetadataComponent
                />
            </ErrorBoundary>
        </Container>
    );
}

// AdminListPage.getInitialProps = async function ({
//     ctx: {
//         isServer,
//         store,
//         query
//     },
//     ctx
// }) {
// }
