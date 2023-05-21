import { client } from "./app";
import { mockData } from "./mockData";

const addImage = async (imageLink: string,
        tags: string, 
        path: string, 
        fileName: string,
        dateSaved: string
    ) => {
    const response = await client.data.creator()
        .withClassName('Meme')
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

for (const img of mockData) {
    let response = addImage(
        img[0],
        img[1],
        img[2],
        img[3],
        img[4],
    );
    
    console.log("The response", response);
}
