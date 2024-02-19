import React from "react";
import FilaHorario, { Curso } from "./FilaHorario";
import { CANTIDAD_MODULOS, MODULO_ANTES_ALMUERZO } from "../util/util";

interface Props {
  modulos: Modulo[];
}

function Horario({ modulos }: Props) {
  const cursos: Curso[][][] = [];
  for (let i = 0; i < CANTIDAD_MODULOS; i++) {
    cursos[i] = [];
    for (let j = 0; j < 6; j++) {
      cursos[i][j] = [];
    }
  }
  modulos.forEach((modulo) => {
    cursos[modulo.modulo][modulo.dia].push(modulo.curso);
  });

  const filas = [];
  for (let i = 0; i < CANTIDAD_MODULOS; i++) {
    filas.push(
      i === MODULO_ANTES_ALMUERZO - 1 ? (
        <React.Fragment key={i}>
          <FilaHorario key={i} modulo={i} cursos={cursos[i]} />
          <tr>
            <td className="bg-red-800 font-markinLT">13:30</td>
            <td
              className="text-center font-markinLT py-2 font-semibold text-[18px] bg-red-800"
              colSpan={6}
            >
              Almuerzo
            </td>
          </tr>
        </React.Fragment>
      ) : (
        <FilaHorario key={i} modulo={i} cursos={cursos[i]} />
      )
    );
  }

  return (
    <>
      <table className="table-fixed border-4 m-auto mt-5 text-center border-white skew-x-[8deg] skew-y-2">
        <thead>
          <tr className="bg-red-900 text-white font-markinLT">
            <th className="p-2 w-[100px]">Módulo</th>
            <th className="p-2 w-[100px]">L</th>
            <th className="p-2 w-[100px]">M</th>
            <th className="p-2 w-[100px]">W</th>
            <th className="p-2 w-[100px]">J</th>
            <th className="p-2 w-[100px]">V</th>
            <th className="p-2 w-[100px]">S</th>
          </tr>
        </thead>
        <tbody>{filas}</tbody>
      </table>
    </>
  );
}

export type Modulo = {
  curso: Curso;
  modulo: number;
  dia: number;
};

export default Horario;
