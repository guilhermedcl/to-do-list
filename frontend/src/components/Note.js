import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false); // estado para controlar se está em modo de edição
  const [content, setContent] = useState(props.content || ""); // estado para armazenar o conteúdo editável

  function handleEditClick() {
    setIsEditing(true); // função para entrar no modo de edição ao clicar no ícone de edição
  }

  function handleInputChange(event) {
    setContent(event.target.value); // função para atualizar o conteúdo editável conforme o usuário digita
  }

  function handleSaveClick() {
    setIsEditing(false); // sair do modo de edição ao salvar
    props.onEdit(props.id, content); // chamar a função de edição passando o id e o novo conteúdo
  }

  function handleCancelClick() {
    setIsEditing(false); // cancelar a edição e restaurar o conteúdo original
    setContent(props.content || ""); // restaurar o conteúdo original ou vazio se não houver conteúdo
  }

  return (
    <div className="note">
      {isEditing ? ( // renderizar o input se estiver em modo de edição, caso contrário renderizar o texto e conteúdo
        <input
          type="text"
          value={content}
          onChange={handleInputChange}
          autoFocus // foco automático no input ao entrar no modo de edição
        />
      ) : (
        <>
          <h1>{props.text}</h1> {/* título da nota */}
          <p>{props.content}</p> {/* conteúdo da nota */}
        </>
      )}
      <div className="icons">
        {isEditing ? ( // renderizar os botões de salvar e cancelar se estiver em modo de edição
          <>
            <button onClick={handleSaveClick}>
              <AddIcon /> {/* ícone de salvar */}
            </button>
            <button onClick={handleCancelClick}>
              <DeleteIcon /> {/* ícone de cancelar */}
            </button>
          </>
        ) : ( // renderizar os botões de editar e deletar se não estiver em modo de edição
          <>
            <button onClick={handleEditClick}>
              <EditIcon /> {/* ícone de editar */}
            </button>
            <button onClick={() => props.onDelete(props.id)}>
              <DeleteIcon /> {/* ícone de deletar */}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Note;
