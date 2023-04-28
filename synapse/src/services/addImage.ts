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
    'https://i.chzbgr.com/full/9295341056/h074C86C7/sky-program-ythor-print-hello-world-uackediari',
    'python hello world',
);

console.log("The response", response);