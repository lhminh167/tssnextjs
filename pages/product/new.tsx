import { createStyles, makeStyles, Theme, Container } from "@material-ui/core";
import CreateProductComponent from "../../modules/product/create/create-product.component";
import { redirect } from "../../modules/shared/helpers/auth.helper";
import { getLoginToken } from "../../modules/shared/helpers/token.helper";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function CreateProductPage(props) {
  const classes = useStyles(props);
  return (
    <Container>
      <CreateProductComponent />
    </Container>
  );
}

CreateProductPage.getInitialProps = async function({
  ctx: { isServer, store, query },
  ctx
}) {
  if (!isServer && !getLoginToken()) redirect(ctx, "/user/login");
};
