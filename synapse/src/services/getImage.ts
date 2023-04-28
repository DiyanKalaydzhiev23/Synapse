import { client } from "./app";


const getImage = async (tags: string) => {
    const resImage = await client.graphql.get()
        .withClassName('Meme')
        .withFields('imageLink')
        .withNearText({
            concepts: ['mom'],
            distance: 0.6,
        })
        .withLimit(1)
        .do();

    return resImage.data.Get.Meme[0];
}


const result = getImage('mom').then((data) => {
    console.log(data);
});
