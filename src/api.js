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
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}