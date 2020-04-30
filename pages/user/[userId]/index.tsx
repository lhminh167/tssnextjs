import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CustomerDetailComponent from '../../../modules/customer/detail/customer-detail.component';
import ErrorBoundary from '../../../modules/shared/error-boundary/error-boundary.component';
import { toNumber } from '../../../modules/shared/helpers/auth.helper';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
    userId: number;
}

export default function CustomerDetailPage({
    userId
}: Props) {
    const classes = useStyles({});
    return (
        <Container>
            <ErrorBoundary>
                <CustomerDetailComponent
                    userId={userId}
                ></CustomerDetailComponent>
            </ErrorBoundary>
        </Container>
    );
}

CustomerDetailPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store,
        query
    },
    ctx
}) {
    const userId = toNumber(query.userId);
    return {
        userId
    };
}
