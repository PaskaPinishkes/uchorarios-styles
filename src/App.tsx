// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Horario from "./components/Horario";
import { DIA_SEMANA, URL_BUSCACURSOS } from "./util/util";
import { cursos } from "@aurmeneta/buscacursos-uc";

function App() {
  const [modulos, setModulos] = useState([]);
  const [modulosShow, setModulosShow] = useState([]);
  const [currentSigla, setCurrentSigla] = useState("");
  const [currentSeccion, setCurrentSeccion] = useState(1);
  const [cantidadSecciones, setCantidadSecciones] = useState(0);
  const siglaSeccionActual = useRef("");
  const cursosCache = useRef({});
  const cursosAgregados: React.MutableRefObject<string[]> = useRef([]);

  async function buscarCurso(sigla: string, seccion: number) {
    if (cursosCache.current[sigla] === undefined) {
      const curso = await cursos.buscarSigla("2024-1", sigla, URL_BUSCACURSOS);
      curso.sort((a, b) => {
        return a.seccion - b.seccion;
      });
      cursosCache.current[sigla] = curso;
    }

    return cursosCache.current[sigla][seccion - 1];
  }

  async function mostrarSeccion(sigla: string, seccion: number) {
    const curso = await buscarCurso(sigla, seccion);
    const tempModulos = [];
    curso.horario.forEach((horario) => {
      let color = "";
      switch (horario.tipo) {
        case "CLAS":
          color = "bg-red-500 text-white";
          break;
        case "AYU":
          color = "bg-orange-900 text-white";
          break;
        case "LAB":
          color = "bg-red-300 text-white";
          break;
        default:
          color = "bg-yellow-400 text-white";
          break;
      }
      tempModulos.push({
        dia: DIA_SEMANA[horario.dia],
        modulo: horario.hora - 1,
        curso: { sigla: `${curso.sigla}-${curso.seccion}`, color: color },
      });
    });
    setModulosShow(tempModulos);
    setCantidadSecciones(cursosCache.current[sigla].length);
    siglaSeccionActual.current = `${sigla}-${seccion}`;
  }

  function agregarSeccion() {
    if (siglaSeccionActual.current === "") return;

    if (cursosAgregados.current.includes(siglaSeccionActual.current)) {
      const tempModulos = [...modulos];
      modulos.forEach((modulo, index) => {
        console.log(modulo.curso.sigla);
        if (modulo.curso.sigla === siglaSeccionActual.current) {
          tempModulos.splice(tempModulos.indexOf(modulo), 1);
        }
      });
      setModulos(tempModulos);
      cursosAgregados.current.splice(
        cursosAgregados.current.indexOf(siglaSeccionActual.current),
        1
      );
    } else {
      cursosAgregados.current.push(siglaSeccionActual.current);
      setModulos([...modulosShow, ...modulos]);
    }
  }

  useEffect(mostrarTodasSecciones, [modulos]);

  function mostrarTodasSecciones() {
    setModulosShow(modulos);
    siglaSeccionActual.current = "";
  }

  return (
    <div>
      <h1 className="font-exposeregular text-center text-[80px]">HORARIO UC</h1>

      <Horario modulos={modulosShow} />
      <br />
      <form
        className="text-center"
        onSubmit={(event) => {
          event.preventDefault();
          mostrarSeccion(currentSigla, currentSeccion);
        }}
      >
        <input
          className="border m-2 text-black"
          value={currentSigla}
          onChange={(e) => {
            setCurrentSigla(e.target.value.toUpperCase());
          }}
          placeholder="Sigla"
        />
        <input
          className="border m-2 text-black"
          value={currentSeccion}
          onChange={(e) => {
            setCurrentSeccion(+e.target.value);
          }}
        />
        <button
          type="submit"
          className="border border-p5-bg m-2 font-p5menu text-[24px] relative hover:before:block hover:before:absolute before:-inset-1 hover:before:-skew-y-3 hover:before:bg-cyan-300 before:ease before:duration-300 transition-all"
        >
          <span className="relative">Buscar Curso</span>
        </button>
      </form>
      <h2 className="text-center">{`${cantidadSecciones} secciones.`}</h2>
      <div className="flex justify-center items-center">
        <button
          className="border border-p5-bg m-4 font-p5menu text-[24px] relative hover:before:block hover:before:absolute before:-inset-1 hover:before:-skew-y-3 hover:before:bg-cyan-300 before:ease before:duration-300 transition-all"
          onClick={agregarSeccion}
        >
          <span className="relative">Agregar/Eliminar Curso</span>
        </button>
        <button
          className="border border-p5-bg m-4 font-p5menu text-[24px] relative hover:before:block hover:before:absolute before:-inset-1 hover:before:-skew-y-3 hover:before:bg-cyan-300 before:ease before:duration-300 transition-all"
          onClick={mostrarTodasSecciones}
        >
          <span className="relative">Mostrar Todas Las Secciones</span>
        </button>
      </div>
    </div>
  );
}

export default App;
