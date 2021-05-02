export async function getPosts(id) {
  let url = "/api/posts?popular=true";
  id && (url += `&before=${id}`);

  // console.log(url);
  try {
    let data = await (
      await fetch(url, {
        method: "GET",
      })
    ).json();
    // console.log(data);
    return { data: data };
  } catch (error) {
    // console.log(error);
    return { error: error };
  }
}
