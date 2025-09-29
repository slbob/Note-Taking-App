const API_URL = '/api/notes';

const noteForm = document.getElementById('noteForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const notesList = document.getElementById('notesList');

// Fetch and display notes
async function fetchNotes() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderNotes(data.data);
}

function renderNotes(notes) {
  notesList.innerHTML = '';
  notes.forEach((note) => {
    const div = document.createElement('div');
    div.className = 'note';

    div.innerHTML = `
      <div class="note-header">
        <strong>${note.title}</strong>
        <div class="note-actions">
          <button onclick="editNote('${note._id}', '${note.title}', '${note.content || ''}')">Edit</button>
          <button onclick="deleteNote('${note._id}')">Delete</button>
        </div>
      </div>
      <p>${note.content || ''}</p>
    `;

    notesList.appendChild(div);
  });
}

// Add or update note
noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const noteId = noteForm.getAttribute('data-edit-id');
  const method = noteId ? 'PUT' : 'POST';
  const url = noteId ? `${API_URL}/${noteId}` : API_URL;

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: titleInput.value,
      content: contentInput.value,
    }),
  });

  if (res.ok) {
    noteForm.removeAttribute('data-edit-id');
    titleInput.value = '';
    contentInput.value = '';
    fetchNotes();
  } else {
    alert('Error saving note');
  }
});

// Edit note
function editNote(id, title, content) {
  titleInput.value = title;
  contentInput.value = content;
  noteForm.setAttribute('data-edit-id', id);
}

// Delete note
async function deleteNote(id) {
  if (!confirm('Delete this note?')) return;
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (res.ok) fetchNotes();
}

// Initial load
fetchNotes();
