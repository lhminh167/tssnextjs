import { makeStyles, Container } from "@material-ui/core";
import ForgotPasswordComponent from "../../modules/customer/forgot-password/forgot-password.component";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";
import { ForgotPasswordMetadataComponent } from "../../modules/customer/forgot-password/forgot-password-metadata.component";

const useStyles = makeStyles(theme => ({
}));

interface Props {
}

export default function ForgotPasswordPage({

}: Props) {
    const classes = useStyles({});

    return (
        <Container
            maxWidth='sm'
        >
            <ErrorBoundary>
                <ForgotPasswordComponent
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <ForgotPasswordMetadataComponent />
            </ErrorBoundary>
        </Container >
    );
}
