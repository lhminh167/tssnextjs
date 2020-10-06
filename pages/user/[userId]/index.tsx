import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { CustomerDetailMetadataComponent } from '../../../modules/customer/detail/customer-detail-metadata.component';
import CustomerDetailComponent from '../../../modules/customer/detail/customer-detail.component';
import ErrorBoundary from '../../../modules/shared/error-boundary/error-boundary.component';
import { toNumber } from '../../../modules/shared/helpers/auth.helper';
import { allowCustomerHoc } from '../../../modules/shared/allow/allow-customer.component';
import { allowAccountOwnwerHoc } from '../../../modules/shared/allow/allow-account-owner.component copy';

function CustomerDetailPage() {
    const router = useRouter();
    const userId = toNumber(router.query.userId as string);


    return (
        <Container>
            <ErrorBoundary>
                <CustomerDetailComponent
                    userId={userId}
                ></CustomerDetailComponent>
            </ErrorBoundary>
            <ErrorBoundary>
                <CustomerDetailMetadataComponent />
            </ErrorBoundary>
        </Container>
    );
}

export default allowCustomerHoc(allowAccountOwnwerHoc(CustomerDetailPage));