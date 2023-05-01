import { client } from "./app";

const addImage = async (imageLink: string,
        tags: string, 
        path: string, 
        fileName: string,
        dateSaved: string
    ) => {
    const response = await client.data.creator()
        .withClassName('MemeExtended')
        .withProperties({
            imageLink: imageLink,
            tags: tags,
            path: path,
            fileName: fileName,
            dateSaved: dateSaved
        })
        .do();
    
    return response;
}

const response = addImage(
    'https://miro.medium.com/v2/resize:fit:439/1*ZYyXvhYDGvELzYoXYpPLMg.png',
    'designers programmers idea stole',
    'G:/Gallery/images/memes/programming/designers.png',
    'designers.png',
    '20.09.2019'
);

console.log("The response", response);