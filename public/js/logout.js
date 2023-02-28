const logoutFormHandler = async (event) => {
    event.preventDefault();
    $('#logoutMessage').remove();
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        $('.navbar').append($('<div>', {
          class: "alert alert-danger",
          id: "logoutMessage",
          html: "<p>Could not log out. Please try again!</p>"
        }));      }
    };
  
  $('#logout').on('click', logoutFormHandler);
  