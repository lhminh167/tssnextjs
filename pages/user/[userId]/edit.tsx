import Container from '@material-ui/core/Container'; import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React from 'react';
import { CustomerEditMetadataComponent } from '../../../modules/customer/edit/edit-customer-metadata.component';
import CustomerEditComponent from '../../../modules/customer/edit/edit-customer.component';
import ErrorBoundary from '../../../modules/shared/error-boundary/error-boundary.component';
import { toNumber } from '../../../modules/shared/helpers/auth.helper';
import { mb, mt } from '../../../modules/shared/layout/layout.style';
import { allowCustomerHoc } from '../../../modules/shared/allow/allow-customer.component';
import { allowAccountOwnwerHoc } from '../../../modules/shared/allow/allow-account-owner.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mb: mb,
        mt: mt
    }),
);

interface Props {
}

function CustomerEditPage({
}: Props) {
    const classes = useStyles({});
    const router = useRouter();
    const userId = toNumber(router.query.userId as string);

    return (
        <Container
            className={classes.mb + ' ' + classes.mt}
        >
            <ErrorBoundary>
                <CustomerEditComponent
                    userId={userId}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <CustomerEditMetadataComponent />
            </ErrorBoundary>
        </Container>
    );
}

export default allowCustomerHoc(allowAccountOwnwerHoc(CustomerEditPage));
