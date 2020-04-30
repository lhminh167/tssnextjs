import { createStyles, makeStyles, Theme, Container } from "@material-ui/core";
import AdminListComponent from "../modules/admin/list/admin-list.component";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";

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
