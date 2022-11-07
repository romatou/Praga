import { useState, useEffect } from 'react'
import Square from './Square'
import { Button } from '@mui/material'

const dimMatr = 8 //Matrix dimension 8x8 (размерность)
const dimMatr2 = dimMatr * dimMatr
let pluses //Глобальная переменная с индексами кораблей
let randPlayer = [] //Рандомные позиции кораблей игрока
let randComp = [] //Рандомные позиции кораблей компьютера
let currPlayer = 'player' //За кем текущий ход
let randMovesComp = [] //рандомные ходы компьютера

const generRandomCompShot = () => {
  //рандом-генерация индекса кнопки, для произведения "выстрела" компьютером
  let rand
  rand = Math.floor(Math.random() * Math.floor(dimMatr2 - 1))
  while (rand === randMovesComp.find(elem => elem === rand)) {
    //проверка на отсутсвие элемента в глобальном randMovesComp
    rand = Math.floor(Math.random() * Math.floor(dimMatr2 - 1))
  }
  randMovesComp.push(rand) //необходимо запоминать ранее произведенные "выстрелы"
  return rand
}

const generateRandom = name => {
  //генерация рандомного числа - расположение кораблей
  const countRand = dimMatr //количество одиночных кораблей
  const rand = []
  let i = 0
  let randCurr //текущее рандомное число
  while (i < countRand) {
    randCurr = Math.floor(Math.random() * Math.floor(dimMatr2 - 1))
    if (randCurr !== rand.find(elem => elem === randCurr)) {
      rand.push(randCurr)
      i++
    }
  }

  if (name === 'player') {
    randPlayer = rand
  } else randComp = rand
}

const isWinner = (squares, name) => {
  const rand = name === 'player' ? randPlayer : randComp
  if (!rand.length) {
    //генерируем рандомную расстановку кораблей в начале боя
    generateRandom(name)
  }

  const obj = new Array(dimMatr2)

  rand.forEach(elem => (obj[elem] = '+'))

  let counter = 0

  pluses = obj.map((elem, index) => (elem ? index : null)) //в глобальную переменную записываем индексы кораблей поля, например [2, 7, 12]

  for (let i = 0; i < obj.length; i++) {
    //переменная counter необходима для проверки того, уничтожены ли все корабли
    if (squares[i] && obj[i]) {
      counter++
    }
  }

  if (counter == obj.reduce((acc, elem) => (elem ? acc + 1 : acc), 0))
    return true //если counter равен числу всех кораблей, то это Победа!

  return null
}

const Board = ({ name, nameBoard }) => {
  const [squaresState, setSquaresState] = useState(Array(dimMatr2).fill(null)) //всего ячеек
  const [countMove, setCountMove] = useState(dimMatr2) //Количество кораблей для уничтожения
  const [countDestroy, setCountDestroy] = useState(dimMatr) //Количество кораблей для уничтожения

  const handleClick = i => {
    if (currPlayer === name) return //если текущий ход равен глобальному currPlayer(тек. ход), то ничего не делаем

    const squares = squaresState.slice()

    if (!countMove || squares[i] || isWinner(squaresState, name)) {
      //Если определен победитель, то return
      randMovesComp = []
      return
    }

    if (countMove) {
      squares[i] = isNaN(pluses.find(elem => elem === i)) ? '*' : '+' //Если при клике угадали положение коробля, то "+"
    } else squares[i] = null

    setSquaresState(squares)
    setCountMove(countMove - 1)

    if (squares[i] === '+') {
      setCountDestroy(countDestroy - 1)
    } else currPlayer = name
  }

  const renderSquare = i => {
    return (
      <Square
        value={squaresState[i]}
        onClick={() => handleClick(i)} //при клике по кнопке в Square выполняем handleClick()
        index={i}
        name={name}
        randPlayer={randPlayer}
        randComp={randComp}
      />
    )
  }

  const createSquare = beg => {
    //Формирование одной строки матрицы
    let begin = beg //Начальное значение: например, матрица 8 х 8 - начальные значения соответсвенно: 0, 8, 16 ...
    return (
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
    )
  }

  const isWin = isWinner(squaresState, name) //переменная хранит булевое значение (победа или нет)
  let status
  if (isWin) {
    status = 'ПОБЕДА!!!'
  } else {
    status = !countMove ? 'Ты проиграл' : 'Осталось ходов: ' + countMove
  }

  return (
    <div className="container_area">
      <div>
        <div className="status1">{status}</div>
        <div className="status2">Осталось уничтожить: {countDestroy}</div>
        <div id="area">
          {createSquare(0)} {/*создается одна строка поля*/}
          {createSquare(8)}
          {createSquare(16)}
          {createSquare(24)}
          {createSquare(32)}
          {createSquare(40)}
          {createSquare(48)}
          {createSquare(56)}
        </div>
        <div className="nameBoard">{nameBoard}</div>
      </div>
    </div>
  )
}

const Game = () => {
  const handleComp = () => {
    if (currPlayer === 'computer') {
      const elems = document.querySelectorAll('.computer' || '.colorize') //в elems записываюся ячейки поля игрока (не компьютера)
      const rand = generRandomCompShot() //для применения к ним стилей
      elems[rand].click() //имитация клика (рандомного) компьютером
    }
  }

  useEffect(() => {
    const id = setInterval(handleComp, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board name="player" nameBoard="расположение моих кораблей" />
          <Board name="computer" nameBoard="поиск кораблей противника" />
        </div>
        <Button
          variant="contained"
          onClick={() => {
            document.location.reload()
          }}>
          Начать заново
        </Button>
      </div>
    </>
  )
}

export default Game
