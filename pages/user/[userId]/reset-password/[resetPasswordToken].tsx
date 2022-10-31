import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import { ResetPasswordMetadataComponent } from "../../../../modules/customer/reset-password/reset-password-metadata.component";
import ResetPasswordComponent from "../../../../modules/customer/reset-password/reset-password.component";
import ErrorBoundary from "../../../../modules/shared/error-boundary/error-boundary.component";

const useStyles = makeStyles((theme) => ({}));

interface Props {}

export default function ResetPasswordPage({}: Props) {
  const classes = useStyles({});

  return (
    <Container>
      <ErrorBoundary>
        <ResetPasswordComponent />
      </ErrorBoundary>
      <ErrorBoundary>
        <ResetPasswordMetadataComponent />
      </ErrorBoundary>
    </Container>
  );
}
