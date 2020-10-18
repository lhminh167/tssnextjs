import { Container } from '@material-ui/core';
import { AdminListMetadataComponent } from '../modules/admin/list/admin-list-metadata.component';
import AdminListComponent from '../modules/admin/list/admin-list.component';
import ErrorBoundary from '../modules/shared/error-boundary/error-boundary.component';
import { allowAdminHoc } from '../modules/shared/allow/allow-admin.component';

function AdminListPage() {
    return (
        <Container>
            <ErrorBoundary>
                <AdminListComponent
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <AdminListMetadataComponent
                />
            </ErrorBoundary>
        </Container>
    );
}

export default allowAdminHoc(AdminListPage);