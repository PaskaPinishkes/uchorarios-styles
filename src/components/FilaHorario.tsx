import { twMerge } from "tailwind-merge";
import { HORA_MODULOS } from "../util/util";

interface Props {
  modulo: number;
  cursos: Curso[][];
}

function FilaHorario({ modulo, cursos }: Props) {
  const bloques = [];
  for (let i = 0; i < 6; i++) {
    const bloque = [];
    if (cursos[i].length == 0) {
      bloque.push(<div className="m-1 p-1 duration-300 transition-all"></div>);
    } else {
      cursos[i].forEach((curso) => {
        bloque.push(
          <div
            className={twMerge(
              "relative before:object-center before:m-auto before:block before:absolute before:-inset-1 before:bg-cyan-300 before:h-[4rem] before:w-[5.5rem] before:duration-300",
              Math.random() > 0.5
                ? Math.random() > 0.5
                  ? "before:skew-y-[3deg] hover:before:-skew-y-[11deg]"
                  : "before:skew-y-[6deg] hover:before:-skew-y-[14deg]"
                : Math.random() > 0.5
                ? "before:-skew-y-[3deg] hover:before:skew-y-[11deg]"
                : "before:-skew-y-[6deg] hover:before:skew-y-[14deg]"
            )}
          >
            <div
              className={twMerge(
                "relative before:object-center before:m-auto before:block before:absolute before:-inset-1 before:bg-red-800 before:h-[4rem] before:w-[5rem] before:duration-300",
                Math.random() > 0.5
                  ? Math.random() > 0.5
                    ? "before:skew-y-[3deg] hover:before:-skew-y-[3deg]"
                    : "before:skew-y-[6deg] hover:before:-skew-y-[6deg]"
                  : Math.random() > 0.5
                  ? "before:-skew-y-[3deg] hover:before:skew-y-[3deg]"
                  : "before:-skew-y-[6deg] hover:before:skew-y-[6deg]"
              )}
            >
              <div
                key={curso.sigla}
                className={twMerge(
                  curso.color,
                  "transform font-p5font p-2 m-1 font text-[18px] border-2 duration-100 transition-all relative",
                  Math.random() > 0.5
                    ? Math.random() > 0.5
                      ? "skew-x-[6deg] hover:-skew-x-[6deg]"
                      : "skew-x-[9deg] hover:-skew-x-[9deg]"
                    : Math.random() > 0.5
                    ? "-skew-x-[6deg] hover:skew-x-[6deg]"
                    : "-skew-x-[9deg] hover:skew-x-[9deg]",
                  Math.random() > 0.5
                    ? Math.random() > 0.5
                      ? "skew-y-[1deg] hover:-skew-y-[1deg]"
                      : "skew-y-[4deg] hover:-skew-y-[4deg]"
                    : Math.random() > 0.5
                    ? "-skew-y-[1deg] hover:skew-y-[1deg]"
                    : "-skew-y-[4deg] hover:skew-y-[4deg]"
                )}
              >
                {curso.sigla}
              </div>
            </div>
          </div>
        );
      });
    }
    bloques.push(
      <td key={i} className="p-2">
        {bloque}
      </td>
    );
  }
  return (
    <tr>
      <td className=" bg-red-800 font-markinLT">{HORA_MODULOS[modulo]}</td>
      {bloques}
    </tr>
  );
}

export type Curso = {
  sigla: string;
  color: string;
};

export default FilaHorario;
