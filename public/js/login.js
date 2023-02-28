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
          html:"<p>Incorrect email or password. Please try again!</p>"
        }));

      }
    }
  };

  $('#loginForm').on('submit', loginFormHandler);


