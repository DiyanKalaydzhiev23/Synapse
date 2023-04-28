import { client } from "./app";

const schemaConfig = {
    'class': 'Meme',
    'vectorizer': 'text2vec-cohere',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'text2vec-cohere': {
            'textFields': [
                'tags'
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
            'dateType': ['string']
        },
        {
            'name': 'dateSaved',
            'dateType': ['string']
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

const addImage = async (imageLink: string, tags: string) => {
    const response = await client.data.creator()
        .withClassName('Meme')
        .withProperties({
            imageLink: imageLink,
            tags: 'mom binary tree',
        })
        .do();
    
    return response;
}

createSchema();
addImage(
    'https://3.bp.blogspot.com/-z7lHrj0L44E/WIuh7Wzo2-I/AAAAAAAABaA/JxcraODITlcFL9DJ7_p862RVzhnfxVpbwCLcB/s1600/1.jpg',
    'mom binary tree',
);