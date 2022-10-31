import Skeleton from "@mui/material/Skeleton";

type IProps = {
  isLoading: boolean;
  children;
};

function SkeletonComponent(props: any) {
  const { isLoading, children } = props;

  return isLoading ? <Skeleton {...props} /> : children;
}

export default SkeletonComponent;
