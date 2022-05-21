
async function getAllPosts() {
  //get all posts data
  const response = await fetch(`/api/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const posts = await response.json();
  console.log(posts)
  return posts;
}

