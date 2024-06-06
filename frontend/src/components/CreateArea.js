import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ text: "" });

  function handleChange(event) {
    const { value } = event.target;
    setNote({ text: value });
  }

  function submitNote(event) {
    event.preventDefault();

    // Verifica se o texto da nota não está vazio
    if (!note.text.trim()) {
        console.error("O texto da nota não pode estar vazio");
        return;
    }

    fetch("http://localhost:3000/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao criar a nota");
            }
            return response.json();
        })
        .then((data) => {
            props.onAdd(data);
            setNote({ text: "" }); // Limpa o estado após a adição da nota
        })
        .catch((error) => console.error("Erro ao criar a nota:", error));
}
function expand() {
  setExpanded(true);
}


  return (
    <div>
      <form className="create-note">
        <textarea
          name="text"
          onClick={expand}
          onChange={handleChange}
          value={note.text}
          placeholder="Digite uma nota..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
