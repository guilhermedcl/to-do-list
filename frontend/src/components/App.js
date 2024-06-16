import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // useEffect para buscar as notas do backend ao montar o componente
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("dados recebidos do backend:", data);
        setNotes(data);
      })
      .catch((error) => console.error("erro ao buscar as notas:", error));
  }, []);

  // função para adicionar uma nova nota
  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  // função para excluir uma nota pelo id
  function deleteNote(id) {
    fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("erro ao excluir a nota");
        }
        return response.json();
      })
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      })
      .catch((error) => console.error("erro ao excluir a nota:", error));
  }

  // função para editar uma nota pelo id e novo texto
  function editNote(id, newText) {
    fetch(`http://localhost:3000/update/${id}`, {
        method: "PUT", // usar método PUT para editar a nota
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }), // enviar novo texto no corpo da requisição
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("erro ao editar a nota");
        }
        return response.json();
    })
    .then((updatedNote) => {
        // atualizar a nota no estado local com o texto atualizado
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === id ? { ...note, text: updatedNote.text } : note
            )
        );
    })
    .catch((error) => console.error("erro ao editar a nota:", error));
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
