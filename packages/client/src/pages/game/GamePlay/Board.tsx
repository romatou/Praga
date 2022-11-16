import {
  useState,
  useEffect,
  useRef,
  useCallback,
  RefObject,
  ReactElement,
} from "react";

import {
  drawCells,
  drawShips,
  drawSunkenShips,
  drawPastCells,
  cellIsEngaged,
  getCell,
  size,
  dimMatr,
  cellSize,
  scaleBoard,
  generateRandomCompShot,
} from "./helper";
import { CellArgs, TBoardProps } from "./types";

let currentPlayer = "player"; //За кем текущий ход

const Board = ({
  name,
  nameBoard,
  gameIsFinished,
  playerShips,
  compShips,
  coords,
}: TBoardProps): ReactElement => {
  const [sunkenShipsPlayer, setSunkenShipsPlayer] = useState<CellArgs[]>([]); //затонувшие корабли player
  const [sunkenShipsComp, setSunkenShipsComp] = useState<CellArgs[]>([]); //затонувшие корабли comp

  const [pastCellsPlayer, setPastCellsPlayer] = useState<CellArgs[]>([]); // клетки мимо игрока
  const [pastCellsComp, setPastCellsComp] = useState<CellArgs[]>([]); // клетки мимо компа

  const allPlayerShips = playerShips && playerShips.flat().length;
  const allCompShips = compShips && compShips.flat().length;

  const [countPlayerShips, setCountPlayerShips] = useState(allPlayerShips); //Количество кораблей для уничтожения
  const [countCompShips, setCountCompShips] = useState(allCompShips); //Количество кораблей для уничтожения

  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // масштаб
    let localRef = null;
    if (canvasRef.current) localRef = canvasRef.current;
    const context: CanvasRenderingContext2D | null = localRef!.getContext("2d");
    context?.scale(scaleBoard, scaleBoard);
  }, []);

  const handleComp = useCallback(() => {
    //комп
    if (!(countCompShips === 0 || countPlayerShips === 0)) {
      if (currentPlayer === name) return; //если текущий ход равен глобальному currentPlayer(тек. ход), то ничего не делаем

      if (currentPlayer === "computer") {
        const cell = generateRandomCompShot() as CellArgs; //рандомная ячейка компа

        if (
          cellIsEngaged({
            cell,
            engagedCells: playerShips! && playerShips.flat(),
          })
        ) {
          //проверка есть ли в кликнутой ячейки корабль игрока
          if (cellIsEngaged({ cell, engagedCells: sunkenShipsPlayer })) return; //если клик был уже по потопл кораблю игрока
          sunkenShipsPlayer.push(cell);
          setSunkenShipsPlayer([...sunkenShipsPlayer]); //если найден корабль противника то внесем его ячейку в потопленные
          setCountPlayerShips(countPlayerShips! - 1); //отнимем коли-во кораблей противника
          currentPlayer = "computer"; //ход остается
        } else {
          if (cellIsEngaged({ cell, engagedCells: pastCellsComp })) return; // если клик по уже пустой клетке
          pastCellsComp.push(cell);
          setPastCellsComp([...pastCellsComp]); // сохранить пустую клетку
          currentPlayer = "player"; //т к ход мимо переход стрельбы
        }
      }
    }
  }, [
    countPlayerShips,
    countCompShips,
    name,
    pastCellsComp,
    playerShips,
    sunkenShipsPlayer,
  ]);

  useEffect(() => {
    let localRef: HTMLCanvasElement | null = null;

    const drawGrid = (context: CanvasRenderingContext2D) => {
      //отрисовка сетки, краблей, клеток попадания, клеток мимо
      context.clearRect(0, 0, size, size);
      drawCells({ context, cellSize, dimMatr });

      drawShips(context, cellSize, playerShips!); //отрисовка караблей
      // drawShips(context, cellSize, compShips!); //временно отрис корабл компа!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      drawSunkenShips(context, cellSize, sunkenShipsPlayer); //отрис потопл-х кораблей
      drawSunkenShips(context, cellSize, sunkenShipsComp); //отрис потопл-х кораблей

      drawPastCells(context, cellSize, pastCellsPlayer); //отрис клетки мимо игрока
      drawPastCells(context, cellSize, pastCellsComp); //отрис клетки мимо компа
    };

    if (canvasRef.current) localRef = canvasRef.current;
    const context: CanvasRenderingContext2D | null = localRef!.getContext("2d");
    drawGrid(context!);

    currentPlayer === "computer" &&
      canvasRef.current!.addEventListener("click", handleComp);

    return () => localRef?.removeEventListener("click", handleComp);
  }, [
    sunkenShipsPlayer,
    sunkenShipsComp,
    pastCellsPlayer,
    pastCellsComp,
    handleComp,
    playerShips,
    compShips,
  ]);

  useEffect(() => {
    if (gameIsFinished) {
      setSunkenShipsPlayer([]);
      setSunkenShipsComp([]);
      setPastCellsPlayer([]);
      setPastCellsComp([]);
      setCountPlayerShips(allPlayerShips);
      setCountCompShips(allCompShips);
      currentPlayer = "player";
      return;
    }
  }, [
    sunkenShipsPlayer,
    sunkenShipsComp,
    pastCellsPlayer,
    pastCellsComp,
    gameIsFinished,
    allCompShips,
    allPlayerShips,
  ]);

  // кликнул игрок
  const handleCellClick = (event: {
    nativeEvent: { offsetX: number; offsetY: number };
  }) => {
    if (!(countCompShips === 0 || countPlayerShips === 0)) {
      if (currentPlayer === name) return; //если текущий ход равен глобальному currentPlayer(тек. ход), то ничего не делаем

      if (currentPlayer === "player") {
        const { offsetX, offsetY } = event.nativeEvent; //определяется ячейка по которой кликнул игрок
        const cell = getCell(offsetX, offsetY); //получил ячейку клика

        if (cellIsEngaged({ cell, engagedCells: compShips!.flat() })) {
          //проверка есть ли в кликнутой ячейки корабль компа
          if (cellIsEngaged({ cell, engagedCells: sunkenShipsComp })) return; //если клик был уже по потопл кораблю компа

          setSunkenShipsComp([...sunkenShipsComp, cell]); //если найден корабль противника то внесем его ячейку в потопленные
          setCountCompShips(countCompShips! - 1); //отнимем коли-во кораблей противника
          currentPlayer = "player"; // ход остается за игроком
        } else {
          if (cellIsEngaged({ cell, engagedCells: pastCellsPlayer })) return; // если клик по уже пустой клетке
          setPastCellsPlayer([...pastCellsPlayer, cell]); // сохранить пустую клетку
          currentPlayer = "computer"; // т к ход мимо переход стрельбы к компу
        }
      }
    }
  };

  useEffect(
    //вызов клика компа
    () => {
      const id = setInterval(handleComp, 100);
      return () => clearInterval(id);
    },
    [handleComp]
  );

  return (
    <div className="container_area">
      <div className="container_area_board">
        <div className="status1">
          {name === "computer"
            ? countCompShips === 0 && "Вы победитель!!!"
            : countPlayerShips === 0 && "Компутер красавчик!!!"}
        </div>
        <div className="status2">
          Осталось уничтожить:{" "}
          {name === "computer" ? countCompShips : countPlayerShips}
        </div>

        <div className="letterCoords">
          {coords.letterCoords.map((letter) => (
            <span key={letter} className="letterCoord">
              {letter}
            </span>
          ))}
        </div>
        <div className="numberCoords">
          {coords.numberCoords.map((number) => (
            <span key={number} className="numberCoord">
              {number}
            </span>
          ))}
        </div>
        <canvas
          ref={canvasRef}
          className={`'canvas' ${name === "computer" && "computerCanvas"}`}
          width={size * scaleBoard}
          height={size * scaleBoard}
          onClick={handleCellClick}
        />
        <div className="nameBoard">{nameBoard}</div>
      </div>
    </div>
  );
};

export default Board;
