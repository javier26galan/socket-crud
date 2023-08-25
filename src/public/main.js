import { loadNotes, onNewNote, onSelected } from "./socket.js";// con la extensionjs porque es en el navegador
import { onHandleSubmit, renderNotes, appendNote, fillForm } from "./ui.js";

onNewNote(appendNote);
loadNotes(renderNotes);
onSelected(fillForm);

const noteForm = document.querySelector('#noteForm');
noteForm.addEventListener("submit", onHandleSubmit);