import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
    scheme: 'https',
    host: 'synapse-tc4b96lh.weaviate.network',
});

const getSchemaRes = async () => {
    const schemaRes = await client
        .schema
        .getter()
        .do()
        .then((res: any) => {
            console.log(res);
        })
        .catch((err: Error) => {
            console.error(err)
        });

    return schemaRes;
} 

console.log(getSchemaRes());

export { client };
