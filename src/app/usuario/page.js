import ContenedorUsuarios from "../componentes/usuarioComponentes/ContenedorUsuarios.jsx"
import FormularioCrearUsuario from "../componentes/usuarioComponentes/FormularioCrearUsuario.jsx";

export default function pageUsuario() {

  return (
    <>
        <h1>PAGINA USUARIO</h1>
        <ContenedorUsuarios></ContenedorUsuarios>
        <FormularioCrearUsuario></FormularioCrearUsuario>
    </>
  );
}