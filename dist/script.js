"use strict";
var notes = [];
const title = document.querySelector("#title");
const note = document.querySelector("#note");
const submitButton = document.querySelector("#addNote");
const removeButton = document.querySelector("#removeNotes");
const notesList = document.querySelector('#notesList');
const notesContainer = document.querySelector('#notes');
const noteFoundContent = '<li>No notes found</li>';
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (title == null || note == null || title.value == "" || note.value == "")
        return alert("Please fill all the fields");
    const data = {
        title: title.value,
        text: note.value,
        date: new Date().toLocaleString()
    };
    const response = addNote(data);
    if (response == false)
        return alert("Something wrong went");
    title.value = '';
    note.value = '';
});
function addNote(details) {
    if (notesList != null && notesList.innerHTML == noteFoundContent)
        notesList.innerHTML = '';
    const li = document.createElement('li');
    li.innerHTML = `<h3>${details.title}</h3><p>${details.text}</p><small>${details.date.toLocaleString()}</small>`;
    if (notesList == null)
        return false;
    notesList.appendChild(li);
    notes.push(details);
    localStorage.setItem("notes", JSON.stringify(notes));
    return true;
}
function loadNotes() {
    const localNotes = localStorage.getItem("notes");
    if (notesList == null)
        return;
    if (localNotes == null) {
        notesList.innerHTML = noteFoundContent;
        return;
    }
    const notesArray = JSON.parse(localNotes);
    notesArray.forEach((details) => {
        notes.push(details);
        const li = document.createElement('li');
        li.innerHTML = `<h3>${details.title}</h3><p>${details.text}</p><small>${details.date.toLocaleString()}</small>`;
        if (notesList == null)
            return false;
        notesList.appendChild(li);
    });
}
loadNotes();
removeButton === null || removeButton === void 0 ? void 0 : removeButton.addEventListener("click", (e) => {
    notes = [];
    localStorage.removeItem("notes");
    if (notesList == null || notesContainer == null)
        return;
    notesList.innerHTML = noteFoundContent;
});
