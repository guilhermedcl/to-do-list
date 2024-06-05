import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received from backend:", data);
        setNotes(data);
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir a nota");
        }
        return response.json();
      })
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      })
      .catch((error) => console.error("Erro ao excluir a nota:", error));
  }

  function editNote(id, newText) {
    fetch(`http://localhost:3000/update/${id}`, { // Usar método PUT e passar ID na URL
        method: "PUT", // Usar PUT em vez de POST
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }), // Enviar o novo texto no corpo da solicitação
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Erro ao editar a nota");
        }
        return response.json();
    })
    .then((updatedNote) => {
        // Atualizar a nota no estado local
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === id ? { ...note, text: updatedNote.text } : note
            )
        );
    })
    .catch((error) => console.error("Erro ao editar a nota:", error));
}


  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
          text={note.text}
          content={note.content}
          onDelete={deleteNote}
          onEdit={editNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
