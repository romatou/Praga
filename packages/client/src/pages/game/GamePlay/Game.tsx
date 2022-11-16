import { useState, useMemo, ReactElement, useEffect } from "react";
import { Button } from "@mui/material";

import {
  generateShipsLayout,
  shipsSet,
  dimMatr,
  generateCoords,
  checkShipsLength3,
} from "./helper";

import Board from "./Board";
import { CellArgs } from "./types";

const Game = (): ReactElement => {
  const [playerShips, setPlayerShips] = useState<CellArgs[][]>(
    generateShipsLayout(shipsSet, dimMatr)
  ); //создание корабликов
  const [compShips, setCompShips] = useState<CellArgs[][]>(
    generateShipsLayout(shipsSet, dimMatr)
  ); //создание корабликов
  const [gameIsFinished, setGameIsFinished] = useState<boolean>(false); //окончание игры

  const coords = useMemo(() => generateCoords(dimMatr), []);

  const restartGame = () => {
    //перезапуск
    document.location.reload();
    setPlayerShips(generateShipsLayout(shipsSet, dimMatr));
    setCompShips(generateShipsLayout(shipsSet, dimMatr));
    setGameIsFinished((prevGameIsFinished) => !prevGameIsFinished);
  };

  useEffect(() => {
    if (checkShipsLength3(compShips)) {
      setCompShips(generateShipsLayout(shipsSet, dimMatr));
    }
  }, [compShips]);

  useEffect(() => {
    if (checkShipsLength3(playerShips)) {
      setPlayerShips(generateShipsLayout(shipsSet, dimMatr));
    }
  }, [playerShips]);

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            name="computer"
            nameBoard="поиск кораблей противника"
            compShips={compShips}
            gameIsFinished={gameIsFinished}
            coords={coords}
          />
          <Board
            name="player"
            nameBoard="расположение моих кораблей"
            playerShips={playerShips}
            gameIsFinished={gameIsFinished}
            coords={coords}
          />
        </div>
        <Button id="reload" onClick={restartGame}>
          Начать заново
        </Button>
      </div>
    </>
  );
};

export default Game;