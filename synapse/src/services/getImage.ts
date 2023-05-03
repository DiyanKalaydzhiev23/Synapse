import { client } from "./app.ts";


const getImagesByTag = async (tags: string) => {
    const resImage = await client.graphql.get()
        .withClassName('MemeExtended')
        .withFields('imageLink path fileName dateSaved tags')
        .withNearText({
            concepts: [tags],
            distance: 0.6,
        })
        .withLimit(10)
        .do();

    return resImage.data.Get.MemeExtended;
}

getImagesByTag('world').then((r) => console.log(r))

export default getImagesByTag;