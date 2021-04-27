export async function getPosts() {
    try {
        let data = await (
            await fetch("/api/posts", {
                method: 'GET',
                qs: {
                    popular: true
                }
            })
        ).json();
        // console.log(data);
        return { data: data };
    } catch (error) {
        // console.log(error);
        return { error: error };
    }
}