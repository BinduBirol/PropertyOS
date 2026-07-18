import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type Props = {
    items: BreadcrumbItem[];
};

export default function CustomBreadcrumbs({ items }: Props) {
    return (
        <Breadcrumbs sx={{ mb: 3 }}>
            {items.map((item, index) => {
                const last = index === items.length - 1;

                if (last) {
                    return (
                        <Typography
                            key={item.label}
                            color="text.primary"
                        >
                            {item.label}
                        </Typography>
                    );
                }

                return item.href ? (
                    <Link
                        key={item.label}
                        component={RouterLink}
                        to={item.href}
                        underline="hover"
                        color="primary"
                    >
                        {item.label}
                    </Link>
                ) : (
                    <Typography
                        key={item.label}
                        color="text.primary"
                    >
                        {item.label}
                    </Typography>
                );
            })}
        </Breadcrumbs>
    );
}