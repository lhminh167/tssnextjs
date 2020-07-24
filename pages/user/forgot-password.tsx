import { makeStyles, Container } from "@material-ui/core";
import ForgotPasswordComponent from "../../modules/customer/forgot-password/forgot-password.component";

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
            <ForgotPasswordComponent
            />
        </Container >
    );
}
