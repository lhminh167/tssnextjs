import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';

interface IProps {
    className?: string;
}

function BrandComponent(props: IProps) {
    const { className } = props;

    return (
        <Link
            href='/'
            as='/'
            passHref
        >
            <Typography
                className={className}
                variant='h6'
                component='a'
                color='primary'
            >
                {process.env.NEXT_PUBLIC_SITE_NAME.toUpperCase()}
            </Typography>
        </Link>
    );
}

export default BrandComponent;