import { Thing, WithContext } from 'schema-dts';
import { STRUCTURED_DATA } from '../tag/tag.model';

interface Props {
    data: WithContext<Thing>
}

export function StructuredDataComponent({
    data
}: Props) {
    return (
        <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data)
            }}
            data-cy={STRUCTURED_DATA}
        />
    );
}
