async function deletePostHandler() {
    console.log("Delete post button clicked")
    let pathname = document.location.pathname;
    postId = pathname.split("/")[2]
    const response = await fetch(`/api/posts/` + postId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
        document.location.replace('/dashboard');
        console.log("post deleted");
    } else {
        console.log(response.statusText);
    }
  }

document.querySelector('#delete-post-btn').addEventListener('click', deletePostHandler);