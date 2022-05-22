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
    document.location.replace('/dashboard')
  } else {
    console.log(response.statusText)
  }
}

async function editPostHandler() {
  console.log("Edit post button clicked")

  let contentEl = document.getElementById("post-content")

  //disable the edit button so user can't create multiple edit boxes
  document.getElementById('edit-post-btn').setAttribute("Disabled", true)

  //get current post content
  let currentPostContent = document.getElementById("post-content-text").textContent.trim()

  //build new comment editing textarea
  let fieldEl = document.createElement("div")
  fieldEl.setAttribute('id', 'edit-post-textarea')
  fieldEl.classList.add("field")
  fieldEl.classList.add("is-horizontal")
  let fieldLabelEl = document.createElement("div")
  fieldLabelEl.classList.add("field-label")
  fieldLabelEl.classList.add("is-normal")
  let labelEl = document.createElement("label")
  labelEl.classList.add("label")
  labelEl.textContent = "Updated content"
  fieldLabelEl.appendChild(labelEl)
  fieldEl.appendChild(fieldLabelEl)
  let fieldBody = document.createElement("div")
  fieldBody.classList.add("field-body")
  fieldBody.classList.add("is-inline")
  fieldEl.appendChild(fieldBody)
  let childFieldEl = document.createElement("div")
  childFieldEl.classList.add("field")
  fieldBody.appendChild(childFieldEl)
  let controlEl = document.createElement("div")
  controlEl.classList.add("control")
  childFieldEl.appendChild(controlEl)
  let textArea = document.createElement("textarea")
  textArea.classList.add("textarea")
  textArea.setAttribute("id", "updated-content")
  textArea.textContent = currentPostContent
  controlEl.appendChild(textArea)

  //add new editable textarea to page
  contentEl.appendChild(fieldEl)

  //build new save and cancel buttons
  let saveButtonEl = document.createElement("button")
  saveButtonEl.classList.add("button")
  saveButtonEl.classList.add("is-success")
  saveButtonEl.classList.add("mx-2")
  saveButtonEl.setAttribute('id', 'save-edit-btn')
  saveButtonEl.textContent = "Save Edit"
  let cancelButtonEl = document.createElement("button")
  cancelButtonEl.classList.add("button")
  cancelButtonEl.classList.add("is-info")
  cancelButtonEl.classList.add("mx-2")
  cancelButtonEl.setAttribute('id', 'cancel-edit-btn')
  cancelButtonEl.textContent = "Cancel Edit"

  //add new buttons to page
  contentEl.appendChild(saveButtonEl)
  contentEl.appendChild(cancelButtonEl)

  //add event listeners for buttons
  document.querySelector('#save-edit-btn').addEventListener('click', saveEditHandler)
  document.querySelector('#cancel-edit-btn').addEventListener('click', cancelEditHandler)

}

async function cancelEditHandler() {

  //delete editable text area
  document.getElementById('edit-post-textarea').remove()

  //delete buttons
  document.getElementById('save-edit-btn').remove()
  document.getElementById('cancel-edit-btn').remove()


  //enable edit post button
  document.getElementById('edit-post-btn').removeAttribute("Disabled")
}

async function saveEditHandler() {
  let content = document.getElementById('updated-content').value
  let pathname = document.location.pathname;
  postId = pathname.split("/")[2]
  const response = await fetch(`/api/posts/` + postId, {
    method: 'PUT',
    body: JSON.stringify({
      content: content,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    document.location.replace(document.location)
  } else {
    console.log(response.statusText)
  }
}

async function createCommentHandler() {
  let comment = document.getElementById('comment-textarea').value
  let pathname = document.location.pathname;
  postId = pathname.split("/")[2]
  const response = await fetch(`/api/comments/`, {
    method: 'POST',
    body: JSON.stringify({
      comment: comment,
      post_id: postId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    document.location.replace(document.location)
  } else {
    console.log(response.statusText)
  }
}

if (document.querySelector('#edit-post-btn')) {
  document.querySelector('#edit-post-btn').addEventListener('click', editPostHandler)
}

if (document.querySelector('#edit-post-btn')) {
  document.querySelector('#delete-post-btn').addEventListener('click', deletePostHandler)
}

document.querySelector('#create-comment-btn').addEventListener('click', createCommentHandler)
