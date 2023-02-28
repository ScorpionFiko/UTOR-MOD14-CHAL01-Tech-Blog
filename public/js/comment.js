const commentFormHandler = async (event) => {
    event.preventDefault();
    $('#commentMessage').remove();
    const user_id = $('#commentUserId').val().trim();
    const article_id = $('#commentArticleId').val().trim();
    const text = $('#commentText').val().trim();

    if (article_id && user_id && text) {
      // TODO: Add a comment describing the functionality of this expression
      const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ article_id, user_id, text }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        const data = response.json();

        $('#commentForm').append($('<div>', {
          class: "alert alert-danger",
          id: "commentMessage",
          html:"<p>Failed to add comment. Please try again!</p>"
        }));

      }
    }
  };

  $('#commentForm').on('submit', commentFormHandler);

const cancelCommentHandler = () => {
    $('#commentText').val('');
}


  $('#cancelComment').on('click', cancelCommentHandler);

