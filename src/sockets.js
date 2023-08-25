import Note from "./models/Note";

export default (io) => {
  //recibe un objeto io (laconexion)
  io.on("connection", (socket) => {
    //aqui socket solo envia eventos al cliente que ha enviado
    //escucha los eventos y me permite enviarlos
    const emitNotes = async () => {
      const notes = await Note.find();
      io.emit("server:loadnotes", notes);
    };
    emitNotes();

    socket.on("client:newnote", async (note) => {
      const newNote = new Note(note);
      const savedNote = await newNote.save();
      io.emit("server:newnote", savedNote); //aqui es io para que vaya al resto de clientes
    });
    socket.on("client:deletenote", async (id) => {
      await Note.findByIdAndDelete(id);
      emitNotes(); //elimino una nota y devuelvo las notas que quedan
    });
    socket.on("client:getnote", async (id) => {
      const note = await Note.findById(id);
      io.emit("server:selectednote", note);
    });
    socket.on("client:updatenote", async (updatedNote) => {
      console.log(updatedNote);
      await Note.findByIdAndUpdate(updatedNote._id,{
        title: updatedNote.title,
        description: updatedNote.description
      });
      emitNotes();
    });
  });
};
