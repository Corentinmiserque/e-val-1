const displayLoginForm = () => `
<div class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-4">
          <form id="loginForm" class="box">
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" class="input" id="username" name="username" placeholder="john@example.com" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" class="input" id="password" name="password" placeholder="********" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <button type="button" class="button is-success" id="loginButton">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
`;

async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const existingToken = sessionStorage.getItem('token');
  
    try {
      const response = await fetch('https://cepegra-frontend.xyz/wf11-1/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Connexion réussie!');
        console.log(data);

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', username); 

        // Call getUserId to store user ID in session storage
        await getUserId(data.token, username); 

             // Vérifier le rôle et rediriger en conséquence
      const userRole = sessionStorage.getItem('role');
      if (userRole === 'stagiaire') {
        window.location.href = 'stagiaireHomepage.html';
      } else if (userRole === 'formateur') {
        window.location.href = 'formateurHomepage.html';
      } else {
        console.error('Rôle non reconnu :', userRole);
      }
    } else {
      console.error('Erreur de connexion:', data.error);
    }
  } catch (error) {
    console.error('Erreur:', error.message);
  }
}
  

async function getUserId(token, username) {  // Added 'username' as a parameter
    try {
      const response = await fetch(`https://cepegra-frontend.xyz/wf11-1/wp-json/wp/v2/users?search${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.length > 0) {
        const user = data[0];
        const userId = user.id;
        const userRole = user.acf.role.value;

        sessionStorage.setItem('id', userId);
        sessionStorage.setItem('role', userRole);
      } else {
        console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur:', data.message || 'Erreur inconnue');
      }
    } catch (error) {
      console.error('Erreur:', error.message);
    }
  }
  
  

function init() {
  const existingToken = sessionStorage.getItem('token');
  if (existingToken) {
    getUserId(existingToken , );
    
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
      loginButton.addEventListener('click', handleLogin);
    }
  });

init();

export { displayLoginForm, handleLogin, getUserId, init };
