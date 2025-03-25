"use client"; // Directiva para indicar que este componente se renderiza solo en el cliente

import { useEffect, useState } from "react";

const Mural: React.FC = () => {
  const [gistContent, setGistContent] = useState<string>("Cargando...");
  const gistId = "bcb3dd701edf92d914d4a3199e85bdcf"; // ID del Gist
  const gistUrl = `https://api.github.com/gists/${gistId}`;

  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await fetch(gistUrl);
        const data = await response.json();
        const gistFiles = data.files;
        let content = "";

        for (const file in gistFiles) {
          const fileContent = gistFiles[file].content.split("\n"); // Dividir el contenido en líneas
          // Unir las líneas a partir de la segunda línea (índice 1)
          content += fileContent.join("\n") + "\n\n";
        }

        setGistContent(content);
      } catch (error) {
        setGistContent("Error al cargar el Gist.");
        console.error("Error:", error);
      }
    };

    fetchGist();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#214386",
        color: "#ffffff",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <pre
        style={{
          backgroundColor: "#0e3448",
          padding: "10px",
          borderRadius: "5px",
          overflowX: "auto", // Permitir desplazamiento horizontal
          whiteSpace: "pre", // Mantener el formato original
          fontFamily: "monospace", // Usar fuente monoespaciada
          fontSize: "14px", // Ajustar tamaño de fuente si es necesario
          maxHeight: "80vh", // Limitar la altura máxima
        }}
      >
        {gistContent}
      </pre>
    </div>
  );
};

export default Mural;
