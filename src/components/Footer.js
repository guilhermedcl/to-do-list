import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Equipe: Guilherme, Rayner, Róger, Vinicyus ADS31 | ⓒ {year}</p>
    </footer>
  );
}

export default Footer;