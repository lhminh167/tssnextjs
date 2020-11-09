import { Typography } from '@material-ui/core';
import Link from 'next/link';
import { getEnvVar } from '../crud/crud.service';
import { HOMEPAGE } from '../tag/tag.model';

interface IProps {
    className?: string;
}

function BrandComponent(props: IProps) {
    const { className } = props;
    const siteName = getEnvVar('SITE_NAME') ?? 'eShopMate';

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
                {siteName.toUpperCase()}
            </Typography>
        </Link>
    );
}

export default BrandComponent;