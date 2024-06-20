import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
      <h1>-Suas Anotações-</h1>
      <button className="instrucoesButton" onClick={handleClick}>
        <span class="text">! Instruções de uso !</span>
        <span class="marquee">Clique para ler</span>  
      </button>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="🛈 Clique na nota, digite o texto e salve-a. Você também tem a opção de editá-la ou removê-la caso queira."
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ marginTop: '100px' }}
      />
    </header>
  );
}
