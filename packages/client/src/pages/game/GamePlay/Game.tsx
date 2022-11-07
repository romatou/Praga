import React, { useState, useEffect, useRef } from 'react'
import { useMemo } from 'react';
import Square from './Square'
import {
  drawCells,
  drawShips,
  generateShipsLayout,
  shipsSet,
  drawSunkenShips,
  drawPastCells,
  cellIsEngaged,
  cellSetsIsEqual
} from './helper';


const size = 300;

const dimMatr = 8;                    //cellCount Matrix dimension 8x8 (размерность)
const cellSize = size / dimMatr;

let dimMatr2 = dimMatr * dimMatr;
let pluses;                         //Глобальная переменная с индексами кораблей
let randPlayer = [];                //Рандомные позиции кораблей игрока
let randomPlayer = [];
let randComp = [];                  //Рандомные позиции кораблей компьютера
let randomComp = [];
let currPlayer = 'player';          //За кем текущий ход
let randMovesComp = [];             //рандомные ходы компьютера


const generRandomCompShot = () => {        //рандом-генерация индекса кнопки, для произведения "выстрела" компьютером
  let rand;
  rand = Math.floor(Math.random() * Math.floor(dimMatr2 - 1));
  while (rand === randMovesComp.find(elem => elem === rand)) {   //проверка на отсутсвие элемента в глобальном randMovesComp
    rand = Math.floor(Math.random() * Math.floor(dimMatr2 - 1));
  }
  randMovesComp.push(rand);        //необходимо запоминать ранее произведенные "выстрелы"

  return rand;
}

const generateRandom = (name) => {   //генерация рандомного числа - расположение кораблей
  let countRand = dimMatr;       //количество одиночных кораблей
  let rand = [];
  let i = 0;
  let randCurr;         //текущее рандомное число
  while (i < countRand) {
    randCurr = Math.floor(Math.random() * Math.floor(dimMatr2 - 1));
    if (randCurr !== rand.find(elem => elem === randCurr)) {
      rand.push(randCurr);
      i++;
    }
  }

  if (name === 'player') {//расположение кораблей игрока
    randPlayer = rand;
    // console.log(randPlayer)

  } else randComp = rand;//расположение кораблей компа
}


const isWinner = (squares, name) => {
  let rand = name === 'player' ? randPlayer : randComp;
  // console.log(!rand.length)
  if (!rand.length) {
    generateRandom(name); //генерируем рандомную расстановку кораблей в начале боя
  }

  let random = name === 'player' ? randomPlayer : randomComp;
  if (!random.length) {
    // generateRandom(name); 
    // generateShipsLayout(shipsSet, dimMatr, name)//генерируем рандомную расстановку кораблей в начале боя
  }

  const obj = new Array(dimMatr2);

  rand.forEach(elem => obj[elem] = '+');

  let counter = 0;

  pluses = obj.map((elem, index) => elem ? index : null);  //в глобальную переменную записываем индексы кораблей поля, например [2, 7, 12]

  for (let i = 0; i < obj.length; i++) {      //переменная counter необходима для проверки того, уничтожены ли все корабли
    if (squares[i] && obj[i]) {
      counter++;
    }
  }
  let objReduce = obj.reduce((acc, elem) => elem ? acc + 1 : acc, 0)

  if (counter === objReduce && objReduce !== 0) return true; //если counter равен числу всех кораблей, то это Победа! 
  return null;
}


// =============================================================================================================================



const Board = ({ name, nameBoard, ships, gameIsFinished }) => {

  const [squaresState, setSquaresState] = useState(Array(dimMatr2).fill(null)) //всего ячеек
  const [countMove, setCountMove] = useState(dimMatr2) //Количество ходов   
  const [countDestroy, setCountDestroy] = useState(dimMatr) //Количество кораблей для уничтожения

  const [sunkenShips, setSunkenShips] = useState([]); //затонувшие корабли
  const [pastCells, setPastCells] = useState([]);//прошлые клетки

  let context;
  const canvasRef = useRef(null);

  useEffect(() => {
    context = canvasRef.current.getContext('2d');
    context.scale(2, 2); // масштаб
  }, []);

  const drawGrid = (context) => {
    context.clearRect(0, 0, size, size);
    drawCells({ context, cellSize, dimMatr });
    name === 'player' && drawShips(context, cellSize, ships);
    drawSunkenShips({ context, cellSize, sunkenShips });
    drawPastCells({ context, cellSize, pastCells });
  };

  useEffect(() => {
    context = canvasRef.current.getContext('2d');
    drawGrid(context);
    name === 'computer' && canvasRef.current.addEventListener('click', clickHandler);

    if (gameIsFinished) {
      setSunkenShips([]);
      setPastCells([]);

      return;
    }

    return () => canvasRef?.current?.removeEventListener('click', clickHandler);
  }, [sunkenShips, pastCells, ships, name]);

  const clickHandler = ({ layerX, layerY }) => {
    const cell = {
      x: Math.ceil(layerX / cellSize),
      y: Math.ceil(layerY / cellSize)
    };

    console.log(cell)

    if (cellIsEngaged({ cell, engagedCells: ships.flat() })) {
      if (cellIsEngaged({ cell, engagedCells: sunkenShips })) return;

      const ship = ships.find((ship) =>
        ship.find(({ x, y }) => cell.x === x && cell.y === y));
      const newSunkenShips = [...sunkenShips, cell];
      console.log(ship)
      setSunkenShips(newSunkenShips);
      setPastCells((prevPastCells) => [...prevPastCells]);


    }
  }

  const handleClick = (i) => {
    if (currPlayer === name) return; //если текущий ход равен глобальному currPlayer(тек. ход), то ничего не делаем

    const squares = squaresState.slice();

    if (!countMove || (squares[i]) || isWinner(squaresState, name)) {  //Если определен победитель, то return
      randMovesComp = [];
      return;
    }

    if (countMove) {
      squares[i] = isNaN(pluses.find(elem => elem === i)) ? '*' : '+';  //Если при клике угадали положение коробля, то "+"
    }
    else squares[i] = null;

    setSquaresState(squares)
    setCountMove(countMove - 1)

    if (squares[i] === '+') {
      setCountDestroy(countDestroy - 1)
    }
    else currPlayer = name;
  }


  const renderSquare = (i) => {
    return (
      <Square
        value={squaresState[i]}
        onClick={() => handleClick(i)}  //при клике по кнопке в Square выполняем handleClick()
        index={i}
        name={name}
        randPlayer={randPlayer}
        randComp={randComp}
      />
    );
  }

  const isWin = isWinner(squaresState, name);  //переменная хранит булевое значение (победа или нет)

  let status;
  if (isWin) {
    status = 'ПОБЕДА!!!';
  } else {
    status = (!countMove) ? 'Ты проиграл' : 'Осталось ходов: ' + countMove;
  }

  const createSquare = (beg) => {  //Формирование одной строки матрицы
    let begin = beg;  //Начальное значение: например, матрица 8 х 8 - начальные значения соответсвенно: 0, 8, 16 ...
    return (
      <>

        <div className="board-row">
          {renderSquare(begin++)}
          {renderSquare(begin++)}
          {renderSquare(begin++)}
          {renderSquare(begin++)}
          {renderSquare(begin++)}
          {renderSquare(begin++)}
          {renderSquare(begin++)}
          {renderSquare(begin)}
        </div>


      </>
    );
  }

  return (
    <div className="container_area">
      <div>
        <div className="status1">{status}</div>
        <div className="status2">Осталось уничтожить: {countDestroy}</div>
        <div id='area'>
          {createSquare(0)}    {/*создается одна строка поля*/}
          {createSquare(8)}
          {createSquare(16)}
          {createSquare(24)}
          {createSquare(32)}
          {createSquare(40)}
          {createSquare(48)}
          {createSquare(56)}
        </div>

        <canvas
          ref={canvasRef}
          className={`'canvas' ${name === 'computer' && 'computerCanvas'}`}
          width={size * 2}
          height={size * 2}
        />
        <div className="nameBoard">{nameBoard}</div>
      </div>
    </div>
  );
}

// ===========================================================================================================


const Game = () => {

  const [playerShips, setPlayerShips] = useState(generateShipsLayout(shipsSet, dimMatr));
  const [compShips, setCompShips] = useState(generateShipsLayout(shipsSet, dimMatr));
  const [gameIsFinished, setGameIsFinished] = useState(false);

  const handleComp = () => {
    if (currPlayer === 'computer') {
      let elems = document.querySelectorAll('.computer' || '.colorize');  //в elems записываюся ячейки поля игрока (не компьютера) 
      let rand = generRandomCompShot();                                       //для применения к ним стилей
      elems[rand].click();            //имитация клика (рандомного) компьютером
    }
  }

  useEffect(
    () => {
      const id = setInterval(handleComp, 1000);
      return () => clearInterval(id);
    },
    []
  );

  useEffect(() => {
    setPlayerShips(generateShipsLayout(shipsSet, dimMatr))
    setCompShips(generateShipsLayout(shipsSet, dimMatr))
    console.log(compShips)
    console.log(playerShips)
  }, []);


  const restartGame = () => {
    document.location.reload()
    setPlayerShips(generateShipsLayout(shipsSet, dimMatr))
    setCompShips(generateShipsLayout(shipsSet, dimMatr))
    setGameIsFinished((prevGameIsFinished) => !prevGameIsFinished)
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            name='computer'
            nameBoard='поиск кораблей противника'
            ships={compShips}
            gameIsFinished={gameIsFinished}
          />
          <Board
            name='player'
            nameBoard='расположение моих кораблей'
            ships={playerShips}
            gameIsFinished={gameIsFinished}
          />

        </div>
        <button id="reload" onClick={restartGame}>Начать заново</button>
      </div>
    </>
  )

}



export default Game