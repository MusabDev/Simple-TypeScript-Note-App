type Notes = {
  title: string
  text: string
  date: string
}

var notes = [] as Notes[]
let notesLocal = localStorage.getItem("notes")
if (notesLocal) {
  notes = JSON.parse(notesLocal)
}

/*
<li>
  <h3>Note title</h3>
  <p>Description</p>
  <small>5/12/2022, 7:38:30 PM</small>
</li>    
*/

const title = document.querySelector<HTMLInputElement>("#title")
const text = document.querySelector<HTMLInputElement>("#note")
const addBtn = document.querySelector<HTMLInputElement>("#addNote")
const removeBtn = document.querySelector<HTMLInputElement>("#removeNotes")
const noteList = document.querySelector<HTMLUListElement>("#notesList")

function loadNotes() {
  if (noteList === null) return
  noteList.innerHTML = ""
  if (notes.length === 0) {
    const li = document.createElement("li")
    const text = document.createElement("p")
    text.innerText = "No notes yet"
    li.append(text)
    noteList.append(li)
    return
  }

  notes.forEach((data: Notes) => {
    const li = document.createElement("li")
    const title = document.createElement("h3")
    title.innerText = data.title
    li.append(title)
    const text = document.createElement("p")
    text.innerText = data.text
    li.append(text)
    const date = document.createElement("small")
    date.innerText = data.date
    li.append(date)
    noteList.append(li)
  })
}

function addNote(data: Notes) {
  notes.push(data)
  localStorage.setItem("notes", JSON.stringify(notes))
  loadNotes()
}

removeBtn?.addEventListener("click", function (e) {
  e.preventDefault()

  localStorage.removeItem("notes")
  notes = [] as Notes[]
  loadNotes()
})

loadNotes()

addBtn?.addEventListener("click", function (e) {
  e.preventDefault()

  if (title == null || text == null) return

  const titleValue = title?.value as string | null
  const textValue = text?.value as string | null
  if (
    titleValue === null ||
    titleValue.length === 0 ||
    textValue === null ||
    textValue.length === 0
  ) {
    alert("Please fill all the fields")
    return
  }

  const note = {
    title: titleValue,
    text: textValue,
    date: new Date().toLocaleString(),
  }
  addNote(note)

  title.value = ""
  text.value = ""
})
