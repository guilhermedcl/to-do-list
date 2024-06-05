import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(props.content || ""); // Inicializando com props.content ou string vazia

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleInputChange(event) {
    setContent(event.target.value);
  }

  function handleSaveClick() {
    setIsEditing(false);
    props.onEdit(props.id, content);
  }

  function handleCancelClick() {
    setIsEditing(false);
    setContent(props.content || ""); // Restaurando props.content ou string vazia
  }

  return (
    <div className="note">
      {isEditing ? (
        <input
          type="text"
          value={content}
          onChange={handleInputChange}
          autoFocus
        />
      ) : (
        <>
          <h1>{props.text}</h1>
          <p>{props.content}</p>
        </>
      )}
      <div className="icons">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>
              <AddIcon />
            </button>
            <button onClick={handleCancelClick}>
              <DeleteIcon />
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEditClick}>
              <EditIcon />
            </button>
            <button onClick={() => props.onDelete(props.id)}>
              <DeleteIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Note;
