const loginFormHandler = async (event) => {
  event.preventDefault();
  $('#loginMessage').remove();
  const email = $('#loginEmail').val().trim();
  const password = $('#loginPassword').val().trim();

  if (email && password) {
    // TODO: Add a comment describing the functionality of this expression
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const data = response.json();

      $('#loginForm').append($('<div>', {
        class: "alert alert-danger",
        id: "loginMessage",
        html: "<p>Incorrect email or password. Please try again!</p>"
      }));

    }
  }
};

$('#loginForm').on('submit', loginFormHandler);



const registerFormHandler = async (event) => {
  event.preventDefault();
  $('#registerMessage').remove();
  const username = $('#registerUsername').val().trim();
  const email = $('#registerEmail').val().trim();
  const password = $('#registerPassword').val().trim();
  const confirmPassword = $('#registerConfirmPassword').val().trim();

  if (password !== confirmPassword) {
    $('#registerForm').append($('<div>', {
      class: "alert alert-danger",
      id: "registerMessage",
      html: "<p>The passwords do not match. Please try again!</p>"
    }));
    return;
  }

  if (username && email && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const data = response.json();

      $('#registerForm').append($('<div>', {
        class: "alert alert-danger",
        id: "registerMessage",
        html: "<p>Incorrect email or password. Please try again!</p>"
      }));

    }
  }
};

$('#registerForm').on('submit', registerFormHandler);


