import { client } from "./app";

const schemaConfig = {
    'class': 'MemeExtended',
    'vectorizer': 'text2vec-cohere',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'text2vec-cohere': {
            'textFields': [
                'tags',
            ]
        }
    },
    'properties': [
        {
            'name': 'imageLink',
            'dataType': ['string']
        },
        {
            'name': 'tags',
            'dataType': ['string']
        },
        {
            'name': 'fileName',
            'dataType': ['string']
        },
        {
            'name': 'path',
            'dataType': ['string']
        },
        {
            'name': 'dateSaved',
            'dataType': ['string']
        }
    ]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createSchema = async () => {
    const schema = await client.schema
        .classCreator()
        .withClass(schemaConfig)
        .do();   
        
    return schema;
}