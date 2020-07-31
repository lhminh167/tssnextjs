
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import CustomerIndexComponent from "../../modules/customer/index/customer-index.component";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";
import { CustomerIndexMetadataComponent } from "../../modules/customer/index/customer-index-metadata.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function CustomerIndexPage(props) {
    const classes = useStyles(props);
    return (
        <Container>
            <ErrorBoundary>
                <CustomerIndexComponent
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <CustomerIndexMetadataComponent
                />
            </ErrorBoundary>
        </Container>
    );
}

// CustomerIndexPage.getInitialProps = async function ({
//     ctx: {
//         isServer,
//         store,
//         query
//     },
//     ctx
// }) {
// }
