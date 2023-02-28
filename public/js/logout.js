// logs out the user and redirects to the homepage
const logoutHandler = async (event) => {
    event.preventDefault();
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      document.location.replace('/');
    };
  
  $('#logout').on('click', logoutHandler);
  