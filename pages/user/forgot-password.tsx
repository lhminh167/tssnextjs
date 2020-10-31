import { Container } from '@material-ui/core';
import { ForgotPasswordMetadataComponent } from '../../modules/customer/forgot-password/forgot-password-metadata.component';
import ForgotPasswordComponent from '../../modules/customer/forgot-password/forgot-password.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';


export default function ForgotPasswordPage() {

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
