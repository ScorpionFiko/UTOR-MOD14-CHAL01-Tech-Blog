// hiding the save button on page load
$(document).ready(() => {
  $('#saveArticle').hide();
});
// ensuring save button appears when required data is entered in both fields
const handleRenderSaveBtn = () => {
  if (!$('#articleTitle').val().trim() || !/.{15,}/.test($('#articleText').val().trim())) {
    $('#saveArticle').hide();
  } else {
    $('#saveArticle').show();
  }
};
$('#articleTitle').keyup(handleRenderSaveBtn);
$('#articleText').keyup(handleRenderSaveBtn);

// event handler for clicking on the note's view and delete buttons
const handleNoteClick = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const article = event.target;
  $('#articleMessage').remove();
  // edit article: fetches article and displays it on the form 
  if (article.matches('.edit-article')) {
    const articleData = await fetch(`/api/articles/${article.parentElement.dataset.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const editArticle = await articleData.json();
    if (articleData.ok) {
      $('#articleTitle').val(editArticle.title);
      $('#articleText').val(editArticle.text);
      $('#articleId').val(editArticle.id);
    } else {
      resetForm();
    }
  }


  if (article.matches('.delete-article')) {
    const deletedNote = await fetch(`/api/articles/${article.parentElement.dataset.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    const message = await deletedNote.json();
    if (deletedNote.ok) {
      document.location.reload();
    } else {
      $(article).prepend($('<div>', {
        class: "alert alert-danger",
        id: "articleMessage",
        html: "<span>Failed to delete article. Please try again!</span>"
      }));
      resetForm();
    }

  }
}
$('.list-container').on('click', handleNoteClick);

// resets article form
const resetForm = () => {
  $('#articleId').val('');
  $('#articleTitle').val('');
  $('#articleText').val('');
  $('#saveArticle').hide();
}

// handles new note form preparation
const handleNewNote = (event) => {
  event.preventDefault();
  event.stopPropagation();
  resetForm();
}
$('#newArticle').on('click', handleNewNote);


// event handler for saving the article regardless of whether the article is new or existing 
const handleSaveArticle = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  let API = `/api/articles`
  if (($('#articleId').val().trim() !== '')) {
    API += `/${$('#articleId').val().trim()}`
  }

  const articleData = await fetch(API, {
    method: ($('#articleId').val().trim() === '' ? 'POST' : 'PUT'),
    body: JSON.stringify({
      id: ($('#articleId').val().trim() === '' ? '' : $('#articleId').val()),
      title: $('#articleTitle').val().trim(),
      text: $('#articleText').val().trim()
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (articleData.ok) {
    document.location.reload();
  } else {
    $('#articleForm').prepend($('<div>', {
      class: "alert alert-danger",
      id: "articleMessage",
      html: `<span>Could not save article. Please try again later!</span>`
    }));
  }
}
$('#saveArticle').on('click', handleSaveArticle);