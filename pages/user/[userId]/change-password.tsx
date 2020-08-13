import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ErrorBoundary from '../../../modules/shared/error-boundary/error-boundary.component';
import { toNumber } from '../../../modules/shared/helpers/auth.helper';
import { Container } from '@material-ui/core';
import ChangePasswordComponent from '../../../modules/customer/change-password/change-password.component';
import { ChangePasswordMetadataComponent } from '../../../modules/customer/change-password/change-password-metadata.component';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
}

export default function CustomerChangePasswordPage({
}: Props) {
    const classes = useStyles({});
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
