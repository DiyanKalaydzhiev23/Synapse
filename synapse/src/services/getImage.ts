import { client } from "./app.ts";


const getImagesByTag = async (tags: string) => {
    const resImage = await client.graphql.get()
        .withClassName('Meme')
        .withFields('imageLink path fileName dateSaved tags')
        .withNearText({
            concepts: [tags],
            distance: 0.6,
        })
        .withLimit(6)
        .do();

    return resImage.data.Get.Meme;
}

getImagesByTag('designers').then((r) => console.log(r))

export default getImagesByTag;