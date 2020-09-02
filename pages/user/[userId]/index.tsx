import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CustomerDetailComponent from '../../../modules/customer/detail/customer-detail.component';
import ErrorBoundary from '../../../modules/shared/error-boundary/error-boundary.component';
import { toNumber } from '../../../modules/shared/helpers/auth.helper';
import { Container } from '@material-ui/core';
import { CustomerDetailMetadataComponent } from '../../../modules/customer/detail/customer-detail-metadata.component';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getLoginToken } from '../../../modules/shared/helpers/token.helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
}

export default function CustomerDetailPage({
}: Props) {
    const classes = useStyles({});
    const router = useRouter();
    const userId = toNumber(router.query.userId as string);

    useEffect(() => {
        if (!getLoginToken()) router.push("/user/login");
    }, []);

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
