async function logoutHandler() {
  console.log("Logout button clicked")
  const response = await fetch(`/api/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.status == 204) {
    console.log("logout successful")
    document.location.replace('/')
  }
}

if (document.querySelector('.logout-btn')) {
  document.querySelector('.logout-btn').addEventListener('click', logoutHandler)
}