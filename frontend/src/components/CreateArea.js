import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ text: "" });

  // função para atualizar o estado da nota conforme o usuário digita
  function handleChange(event) {
    const { value } = event.target;
    setNote({ text: value });
  }

  // função para enviar a nota para o backend ao clicar no botão de adicionar
  function submitNote(event) {
    event.preventDefault();

    // Verifica se o texto da nota não está vazio
    if (!note.text.trim()) {
        console.error("o texto da nota não pode estar vazio");
        return;
    }

    fetch("http://localhost:7000/api/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("erro ao criar a nota");
            }
            return response.json();
        })
        .then((data) => {
            props.onAdd(data);
            setNote({ text: "" }); // Limpa o estado após a adição da nota
        })
        .catch((error) => console.error("erro ao criar a nota:", error));
}

// função para expandir a área de texto ao clicar nela
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
          placeholder="digite uma nota..."
          rows={isExpanded ? 3 : 1} // número de linhas depende se está expandido ou não
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
