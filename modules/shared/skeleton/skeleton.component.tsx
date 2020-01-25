import Skeleton, { SkeletonTypeMap } from '@material-ui/lab/Skeleton';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { Fragment } from 'react';

type IProps = {
    isLoading: boolean;
    children;
};

function SkeletonComponent(props) {
    const { isLoading, children } = props;

    return isLoading
                ? <Skeleton {...props} />
                : children
        
    ;
    
}

export default SkeletonComponent;