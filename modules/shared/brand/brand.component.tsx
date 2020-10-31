import { Typography } from '@material-ui/core';
import Link from 'next/link';
import { HOMEPAGE } from '../tag/tag.model';

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
                data-cy={HOMEPAGE}
            >
                {process.env.SITE_NAME.toUpperCase()}
            </Typography>
        </Link>
    );
}

export default BrandComponent;