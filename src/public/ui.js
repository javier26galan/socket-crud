//este archivo va a contener funciones que van a interactuar con la interfaz de usuario para
import { saveNote, deleteNote, getNoteById, updateNote } from "./socket.js";

const notesList = document.querySelector("#notes");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
let saveId = "";

const noteUI = (note) => {
  //maneja la creacion de la lista
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card text-white border-secondary m-3 p-2">
            <h4 class="card-header">${note.title}</h4>
        <div card-body>
            <p class="cardtext">${note.description}</p>
        </div>
        <div card-footer>
            <button class="delete btn btn-outline-danger" data-id="${note._id}">Delete</button>
            <button class="update btn btn-outline-warning" data-id="${note._id}">Update</button>
        </div>
    </div>
    `;
  const btnUpdate = div.querySelector(".update");
  const btnDelete = div.querySelector(".delete");
  btnUpdate.addEventListener("click", (e) => {
    getNoteById(btnUpdate.dataset.id);
  });
  btnDelete.addEventListener("click", (e) => {
    deleteNote(btnDelete.dataset.id);
  });
  return div;
};

export const renderNotes = (notesArr) => {
  notesList.innerHTML = ""; //para evitar el duplicado de notas, lo ponemos vacio para que añada
  notesArr.forEach((note) => {
    //tiene que ser append porque noteUI devielve un elemento html
    notesList.append(noteUI(note));
  });
};

export const onHandleSubmit = (e) => {
  e.preventDefault();
  if (saveId) {
    updateNote(saveId, title.value, description.value);
  } else {
    saveNote(title.value, description.value);
  }
  //reset form y el id para actualizar
  saveId = "";
  title.value = "";
  description.value = "";
};

export const fillForm = (note) => {
  saveId = note._id;
  title.value = note.title;
  description.value = note.description;
};

export const appendNote = (note) => {
  notesList.append(noteUI(note));
};
