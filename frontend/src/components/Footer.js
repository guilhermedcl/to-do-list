import React from "react";

function Footer() {
  const year = new Date().getFullYear(); // obtém o ano atual
  return (
    <footer>
      <p>equipe: Guilherme, Rayner, Róger, Vinicyus ADS31 | ⓒ {year}</p> {/* exibe informações da equipe e o ano atual */}
    </footer>
  );
}

export default Footer;
