import { client } from "./app";

const schemaConfig = {
    'class': 'Meme',
    'vectorizer': 'img2vec-neural',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'img2vec-neural': {
            'imageFields': [
                'image'
            ]
        }
    },
    'properties': [
        {
            'name': 'image',
            'dataType': ['blob']
        },
        {
            'name': 'text',
            'dataType': ['string']
        }
    ]
}

const createSchema = async () => {
    const schema = await client.schema
        .classCreator()
        .withClass(schemaConfig)
        .do();   
        
    return schema;
}

createSchema();
