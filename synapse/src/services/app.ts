import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
    scheme: 'https',
    host: 'synapseos-8zx3evv2.weaviate.network',
    headers: {
        "X-Cohere-Api-Key": 'zdID0QrXifIhOaEhdMdrCz0qayOuvfYIrAaJ584l',
    }
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

export { client };
