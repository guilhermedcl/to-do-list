import React from "react";

function Footer() {
  const year = new Date().getFullYear(); // obtém o ano atual
  return (
    <footer>
      <p>Equipe: Guilherme, Rayner, Róger, Vinicyus ADS31 | © {year} Todos os direitos reservados.</p> {/* exibe informações da equipe e o ano atual */}
    </footer>
  );
}

export default Footer;
