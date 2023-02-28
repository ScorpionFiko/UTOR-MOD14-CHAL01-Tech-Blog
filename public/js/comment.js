// hides the add button when the page loads
$(document).ready(()=> {
  $('#addComment').hide();
})
// display the save button only when 15 characters are reached
const handleRenderAddButton = (event) => {
  if (!/.{15,}/.test($('#commentText').val().trim())) {
    $('#addComment').hide();
  } else {
    $('#addComment').show();
  }
};
$('#commentText').keyup(handleRenderAddButton);

//adds the comment to the database
const commentFormHandler = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  $('#commentMessage').remove();
  const user_id = $('#commentUserId').val().trim();
  const article_id = $('#commentArticleId').val().trim();
  const text = $('#commentText').val().trim();

  if (article_id && user_id && text) {
    const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify({ article_id, user_id, text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      $('#commentForm').prepend($('<div>', {
        class: "alert alert-danger",
        id: "commentMessage",
        html: "<span>Failed to add comment. Please try again!</span>"
      }));

    }
  }
};
$('#commentForm').on('submit', commentFormHandler);

// cancel comment handler when user clicks cancel button
const handleCancelComment = () => {
  $('#commentText').val('');
  $('#addComment').hide();
}
$('#cancelComment').on('click', handleCancelComment);

