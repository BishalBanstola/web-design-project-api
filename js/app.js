// app.js

async function initAuth0() {
  const auth0 = await createAuth0Client({
    domain: "dev-xvv0pvrqkgxsikp3.us.auth0.com",
    client_id: "Dj9BctQtEdC47bvIrMVQJc2H0kypuc6X",
    redirect_uri: window.location.origin,
  });

  const isAuthenticated = await auth0.isAuthenticated();

  const loginButton = document.getElementById("login");
  loginButton.addEventListener("click", async () => {
    await auth0.loginWithRedirect();
  });

  const logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", async () => {
    await auth0.logout({
      returnTo: window.location.origin,
    });
  });

  const profileElement = document.getElementById("profile");
  const updateProfile = async () => {
    const user = await auth0.getUser();
    profileElement.innerText = JSON.stringify(user, null, 2);
  };

  if (isAuthenticated) {
    profileElement.style.display = "block";
    updateProfile();
  } else {
    profileElement.style.display = "none";
  }
}

initAuth0();
