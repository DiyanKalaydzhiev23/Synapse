import { client } from "./app.ts";


const getImagesByTag = async (tags: string) => {
    const resImage = await client.graphql.get()
        .withClassName('Meme')
        .withFields('imageLink')
        .withNearText({
            concepts: [tags],
            distance: 0.6,
        })
        .withLimit(10)
        .do();

    return resImage.data.Get.Meme;
}

export default getImagesByTag;