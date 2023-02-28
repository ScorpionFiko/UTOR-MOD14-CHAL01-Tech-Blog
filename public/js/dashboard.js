let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

// if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
// }

// Show an element
const show = (elem) => {
  // added check for the location so that no errors are thrown on the landing page
  if (elem !== undefined) {
    elem.style.display = 'inline'
  };
};

// Hide an element
const hide = (elem) => {
  // added check for the location so that no errors are thrown on the landing page
  if (elem !== undefined) {
    elem.style.display = 'none'
  };
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// const getNotes = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((data) => { return data })
//     .catch((err) => { console.error(err) });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then((response) => { return response.ok; })
    .catch((err) => { console.error(err) });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => { return response.ok; })
    .catch((err) => { console.error(err) });

const renderActiveNote = () => {
  hide(saveNoteBtn);

  // removed the setting and removal of the "readonly" attribute to allow user to edit existing note
  // added check for the location so that no errors are thrown on the landing page
  // if (window.location.pathname === '/notes') {
    if (activeNote.id) {
      noteTitle.value = activeNote.title;
      noteText.value = activeNote.text;
    } else {
      noteTitle.value = '';
      noteText.value = '';
    }
  // }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
    id: (activeNote.id)
  };

  // placing the call to renderActiveNote() in the then() to ensure all notes are retrieved first 
  saveNote(newNote).then(() => {
    getAndRenderNotes().then(renderActiveNote);
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  // placing the call to renderActiveNote() in the then() to ensure all notes are retrieved first
  deleteNote(noteId).then(() => {
    getAndRenderNotes().then(renderActiveNote);
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
// const renderNoteList = async (notes) => {
//   let jsonNotes = await notes.json();
//   if (window.location.pathname === '/notes') {
//     noteList.forEach((el) => (el.innerHTML = ''));
//   }

//   let noteListItems = [];

//   // Returns HTML element with or without a delete button
//   const createLi = (text, delBtn = true) => {
//     const liEl = document.createElement('li');
//     liEl.classList.add('list-group-item');

//     const spanEl = document.createElement('span');
//     spanEl.classList.add('list-item-title');
//     spanEl.innerText = text;
//     spanEl.addEventListener('click', handleNoteView);

//     liEl.append(spanEl);

//     if (delBtn) {
//       const delBtnEl = document.createElement('i');
//       delBtnEl.classList.add(
//         'fas',
//         'fa-trash-alt',
//         'float-right',
//         'text-danger',
//         'delete-note'
//       );
//       delBtnEl.addEventListener('click', handleNoteDelete);

//       liEl.append(delBtnEl);
//     }

//     return liEl;
//   };

//   if (jsonNotes.length === 0) {
//     noteListItems.push(createLi('No saved Notes', false));
//   }

//   jsonNotes.forEach((note) => {
//     // new if statement to ensure the active note (if one exists) has the updated information from storage
//     if (note.id === activeNote.id) {
//       activeNote = note;
//     }
//     const li = createLi(note.title);
//     li.dataset.note = JSON.stringify(note);

//     noteListItems.push(li);
//   });

//   if (window.location.pathname === '/notes') {
//     noteListItems.forEach((note) => noteList[0].append(note));
//   }
// };

// Gets notes from the db and renders them to the sidebar
//const getAndRenderNotes = () => getNotes().then(renderNoteList);

// if (window.location.pathname === '/notes') {
  // saveNoteBtn.addEventListener('click', handleNoteSave);
  // newNoteBtn.addEventListener('click', handleNewNoteView);
  // noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  // noteText.addEventListener('keyup', handleRenderSaveBtn);
// }

//getAndRenderNotes();



const handleNoteClick = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const article = event.target;
  $('#articleMessage').remove();
  if (article.matches('.edit-article')) {
    // fetch note for editing
  } 

  if (article.matches('.delete-article')) {
    // delete note
    // refresh after delete
    const deletedNote = await fetch(`/api/articles/${article.parentElement.dataset.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json' }
    });
    if (deletedNote.ok) {
      document.location.reload();
    } else {
      $(article).append($('<div>', {
        class: "alert alert-danger",
        id: "articleMessage",
        html:"<p>Failed to add comment. Please try again!</p>"
      }));

    }

  } 
}

$('.list-container').on('click', handleNoteClick);