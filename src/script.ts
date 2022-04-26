type Note = {
  title: string,
  text: string,
  date: string
}

var notes = [] as Note[]

const title = document.querySelector<HTMLTextAreaElement>("#title")
const note = document.querySelector<HTMLTextAreaElement>("#note")
const submitButton = document.querySelector<HTMLButtonElement>("#addNote") 
const removeButton = document.querySelector<HTMLButtonElement>("#removeNotes") 
const notesList = document.querySelector<HTMLDivElement>('#notesList')
const notesContainer = document.querySelector<HTMLDivElement>('#notes')
const noteFoundContent = '<li>No notes found</li>'

submitButton?.addEventListener("click", (e) => {
  e.preventDefault();

  if (title == null || note == null || title.value == "" || note.value == "") return alert("Please fill all the fields");

  const data: Note = {
    title: title.value,
    text: note.value,
    date: new Date().toLocaleString()
  }

  const response = addNote(data);
  if (response == false) return alert("Something wrong went");

  title.value = ''
  note.value = ''
})

function addNote(details: Note): boolean {
  if (notesList != null && notesList.innerHTML == noteFoundContent) notesList.innerHTML = ''

  const li = document.createElement('li') as HTMLLIElement
  li.innerHTML = `<h3>${details.title}</h3><p>${details.text}</p><small>${details.date.toLocaleString()}</small>`

  if (notesList == null) return false

  notesList.appendChild(li)
  notes.push(details)
  localStorage.setItem("notes", JSON.stringify(notes))

  return true;
}

function loadNotes() {
  const localNotes = localStorage.getItem("notes")

  if (notesList == null) return
  if (localNotes == null) {
    notesList.innerHTML = noteFoundContent
    return;
  }

  const notesArray = JSON.parse(localNotes) as Note[]
  notesArray.forEach((details: Note) => {
    notes.push(details)

    const li = document.createElement('li') as HTMLLIElement
    li.innerHTML = `<h3>${details.title}</h3><p>${details.text}</p><small>${details.date.toLocaleString()}</small>`
  
    if (notesList == null) return false
    notesList.appendChild(li)
  })
}

loadNotes()

removeButton?.addEventListener("click", (e) => {
  notes = [] as Note[]
  localStorage.removeItem("notes")

  if (notesList == null || notesContainer == null) return
  notesList.innerHTML = noteFoundContent
})