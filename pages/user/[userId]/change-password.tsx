import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { ChangePasswordMetadataComponent } from '../../../modules/customer/change-password/change-password-metadata.component';
import ChangePasswordComponent from '../../../modules/customer/change-password/change-password.component';
import ErrorBoundary from '../../../modules/shared/error-boundary/error-boundary.component';
import { toNumber } from '../../../modules/shared/helpers/auth.helper';
import { allowCustomerHoc } from '../../../modules/shared/allow/allow-customer.component';

function CustomerChangePasswordPage() {
    const router = useRouter();
    const userId = toNumber(router.query.userId as string);

    return (
        <Container>
            <ErrorBoundary>
                <ChangePasswordComponent
                    userId={userId}
                ></ChangePasswordComponent>
            </ErrorBoundary>
            <ErrorBoundary>
                <ChangePasswordMetadataComponent
                />
            </ErrorBoundary>
        </Container>
    );
}

export default allowCustomerHoc(CustomerChangePasswordPage);