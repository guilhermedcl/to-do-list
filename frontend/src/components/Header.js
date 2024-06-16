import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
  const [open, setOpen] = React.useState(false); // estado para controlar se o Snackbar está aberto ou fechado

  const handleClick = () => {
    setOpen(true); // abre o Snackbar ao clicar no botão
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // ignora o fechamento se o motivo for um clique fora da Snackbar
    }

    setOpen(false); // fecha o Snackbar
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <header>
      <h1>minhas notas!</h1> {/* título principal */}
      <Button
        style={{ backgroundColor: "#ff0000", color: "#ffffff" }} // estilo do botão
        onClick={handleClick} // função para lidar com o clique no botão
      >
        ! instruções de uso ! {/* texto do botão */}
      </Button>
      <Snackbar
        open={open} // estado que controla se o Snackbar está aberto ou fechado
        autoHideDuration={6000} // duração automática de exibição do Snackbar
        onClose={handleClose} // função para lidar com o fechamento do Snackbar
        message="Clique na nota, digite o texto e salve-a. Você também tem a opção de editá-la ou removê-la caso queira." // mensagem exibida no Snackbar
        action={action} // ação exibida no Snackbar (ícone de fechar)
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // posição de ancoragem do Snackbar
        style={{ marginTop: '100px' }} // estilo adicional para o Snackbar
      />
    </header>
  );
}
