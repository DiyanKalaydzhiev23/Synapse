import { client } from "./app";

const addImage = async (imageLink: string, tags: string) => {
    const response = await client.data.creator()
        .withClassName('Meme')
        .withProperties({
            imageLink: imageLink,
            tags: tags,
        })
        .do();
    
    return response;
}

const response = addImage(
    'https://3.bp.blogspot.com/-z7lHrj0L44E/WIuh7Wzo2-I/AAAAAAAABaA/JxcraODITlcFL9DJ7_p862RVzhnfxVpbwCLcB/s1600/1.jpg',
    'mom binary tree',
);

console.log("The response", response);