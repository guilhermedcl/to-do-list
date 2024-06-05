import React from "react";
import Button from "@mui/material/Button";
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
      <h1>Minhas Notas!</h1>
      <Button
        style={{ backgroundColor: "#ff0000", color: "#ffffff" }}
        onClick={handleClick}
      >
        ! Instruções de uso !
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Clique na nota, digite o texto e salve-a. Você também tem a opção de editá-la ou removê-la caso queira."
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ marginTop: '100px' }}
      />
    </header>
  );
}
