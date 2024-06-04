import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SimpleSnackbar() {
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
      <Button color="primary" size="small" onClick={handleClose}>
        DESFAZER
      </Button>
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
      <h1>Minhas Notas!</h1>
      <Button color="inherit" onClick={handleClick}>
       - Instruções de uso -
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Clique na nota, digite o texto e, se necessário, insira um título. Depois, adicione sua anotação em nosso mural."
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ marginTop: '100px' }}
      />
    </header>
  );
}