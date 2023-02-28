let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

$(document).ready(() => {
  $('#saveArticle').hide();
});

const handleRenderSaveBtn = () => {
  if (!$('#articleTitle').val() || !$('#articleText').val()) {
    $('#saveArticle').hide();
  } else {
    $('#saveArticle').show();
  }
};

$('#articleTitle').keyup(handleRenderSaveBtn);
$('#articleText').keyup(handleRenderSaveBtn);




const handleNoteClick = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const article = event.target;
  $('#articleMessage').remove();
  if (article.matches('.edit-article')) {
    // fetch note for editing

    const articleData = await fetch(`/api/articles/${article.parentElement.dataset.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const editArticle = await articleData.json();
    if (articleData.ok) {
      $('#articleTitle').val(editArticle.title);
      $('#articleText').val(editArticle.text);
      $('#articleId').val(editArticle.id);
    };
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
      $(article).append($('<div>', {
        class: "alert alert-danger",
        id: "articleMessage",
        html: "<p>Failed to delete article. Please try again!</p>"
      }));

    }

  }
}

$('.list-container').on('click', handleNoteClick);


$('#newArticle').on('click', (event) => {
  event.preventDefault();
  event.stopPropagation();

  $('#articleId').val('');
  $('#articleTitle').val('');
  $('#articleText').val('');
  $('#saveArticle').hide();
});

$('#saveArticle').on('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  let API = `/api/articles`
  if (($('#articleId').val().trim() !== '')) {
    API += `/${ $('#articleId').val().trim() }`
  }

  const articleData = await fetch(API, {
    method: ($('#articleId').val().trim() === '' ? 'POST' : 'PUT'),
    body: JSON.stringify({
      id: ($('#articleId').val() === ''  ? '' : $('#articleId').val()),
      title: $('#articleTitle').val(),
      text: $('#articleText').val()
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  //const newArticle = await articleData.json();
  if (articleData.ok) {
    document.location.reload();
  } else {
    $('#articleForm').append($('<div>', {
      class: "alert alert-danger",
      id: "loginMessage",
      html: `<p>Could not save article. Please try again later!</p>`
    }));
  }
});