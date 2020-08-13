
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import CustomerIndexComponent from "../../modules/customer/index/customer-index.component";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";
import { CustomerIndexMetadataComponent } from "../../modules/customer/index/customer-index-metadata.component";
import { useEffect } from "react";
import { getLoginToken } from "../../modules/shared/helpers/token.helper";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function CustomerIndexPage(props) {
    const classes = useStyles(props);
    const router = useRouter();

    useEffect(() => {
        if (!getLoginToken()) router.push("/user/login");
    }, []);

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
