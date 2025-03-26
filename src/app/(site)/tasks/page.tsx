export default function Calendar() {
  return (
    <div>
      <div className="bg-blue-900 text-white py-12 px-8 md:px-0">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tareas de la comunidad
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            Colabora con la comunidad y ayuda a construir el futuro juntos.
          </p>
        </div>
      </div>
      <div>
        <iframe
          src="https://cerulean-bell-9b5.notion.site/ebd/1c229b085b38802a80b3c9215da4d5b0?v=1c229b085b3880a184bc000c5a0d3ea5"
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
