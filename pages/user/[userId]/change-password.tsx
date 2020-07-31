import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ErrorBoundary from '../../../modules/shared/error-boundary/error-boundary.component';
import { toNumber } from '../../../modules/shared/helpers/auth.helper';
import { Container } from '@material-ui/core';
import ChangePasswordComponent from '../../../modules/customer/change-password/change-password.component';
import { ChangePasswordMetadataComponent } from '../../../modules/customer/change-password/change-password-metadata.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
    userId: number;
}

export default function CustomerChangePasswordPage({
    userId
}: Props) {
    const classes = useStyles({});
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

CustomerChangePasswordPage.getInitialProps = async function ({
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
