async function createPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    let requiredFieldText = document.createElement('p')
    requiredFieldText.classList.add("help")
    requiredFieldText.classList.add("is-danger")
    requiredFieldText.textContent = "This field is required"

    if (!title) {
        console.log("Title is blank")
        document.querySelector('#post-title').classList.add("is-danger")
        document.querySelector('#post-title-control').appendChild(requiredFieldText)
    }

    if (!content) {
        console.log("Content is blank")
        document.querySelector('#post-content').classList.add("is-danger")
        document.querySelector('#post-content-control').appendChild(requiredFieldText)
    }

    if (title && content) {
        const createPostResponse = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        //create banner for success or error
        let signupElement = document.querySelector('#create-post-box')
        let successBanner = document.createElement('div')
        successBanner.classList.add('notification')
        successBanner.classList.add('is-light')
        successBanner.classList.add('mt-4')

        if (createPostResponse.ok) {
            successBanner.classList.add('is-success')
            successBanner.textContent = "Post created successfully! Go to the home page to see your new post."
            signupElement.appendChild(successBanner)
        } else {
            console.log(createPostResponse.statusText);
            const createdUserError = await createPostResponse.json();
            console.log(createdUserError)
            successBanner.classList.add('is-danger')
            successBanner.textContent = "Error creating new post: " + createdUserError.errors[0].message
            signupElement.appendChild(successBanner)
        }
    }
}

document.querySelector('#create-post-btn').addEventListener('click', createPostHandler);