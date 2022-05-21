async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#user-pass').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            console.log("logged in");
        } else {
            console.log(response.statusText);
        }
    }
}

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#register-id').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const createUserResponse = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (createUserResponse.ok) {
            //if user was created, then log new user in and reditrect to home page
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                document.location.replace('/dashboard');
                console.log("logged in");
            } else {
                console.log(response.statusText);
            }
        } else {
            const createdUserError = await createUserResponse.json();
            console.log(createUserResponse.statusText);
            // display error to user
            let signupElement = document.querySelector('.signup-form')
            let banner = document.createElement('div')
            banner.classList.add('notification')
            banner.classList.add('mt-4')
            banner.classList.add('is-danger')            
            banner.textContent = "Error signing up: " + createdUserError.errors[0].message
            signupElement.appendChild(banner)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);