"use strict";
var notes = [];
let notesLocal = localStorage.getItem("notes");
if (notesLocal) {
    notes = JSON.parse(notesLocal);
}
/*
<li>
  <h3>Note title</h3>
  <p>Description</p>
  <small>5/12/2022, 7:38:30 PM</small>
</li>
*/
const title = document.querySelector("#title");
const text = document.querySelector("#note");
const addBtn = document.querySelector("#addNote");
const removeBtn = document.querySelector("#removeNotes");
const noteList = document.querySelector("#notesList");
function loadNotes() {
    if (noteList === null)
        return;
    noteList.innerHTML = "";
    if (notes.length === 0) {
        const li = document.createElement("li");
        const text = document.createElement("p");
        text.innerText = "No notes yet";
        li.append(text);
        noteList.append(li);
        return;
    }
    notes.forEach((data) => {
        const li = document.createElement("li");
        const title = document.createElement("h3");
        title.innerText = data.title;
        li.append(title);
        const text = document.createElement("p");
        text.innerText = data.text;
        li.append(text);
        const date = document.createElement("small");
        date.innerText = data.date;
        li.append(date);
        noteList.append(li);
    });
}
function addNote(data) {
    notes.push(data);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}
removeBtn === null || removeBtn === void 0 ? void 0 : removeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("notes");
    notes = [];
    loadNotes();
});
loadNotes();
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (title == null || text == null)
        return;
    const titleValue = title === null || title === void 0 ? void 0 : title.value;
    const textValue = text === null || text === void 0 ? void 0 : text.value;
    if (titleValue === null ||
        titleValue.length === 0 ||
        textValue === null ||
        textValue.length === 0) {
        alert("Please fill all the fields");
        return;
    }
    const note = {
        title: titleValue,
        text: textValue,
        date: new Date().toLocaleString(),
    };
    addNote(note);
    title.value = "";
    text.value = "";
});
