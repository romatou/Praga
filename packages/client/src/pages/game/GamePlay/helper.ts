import React from 'react'
import {
  ShipsSet,
  CellArgs,
  DrawCellArgs,
  DrawCellsArgs,
  GeneratedCoords,
  CellIsEngagedArgs,
  CellIsWithinArgs,
  Winner,
} from './types'

export enum DirectionsOfGeneration {
  Left = 'Left',
  Up = 'Up',
  Right = 'Right',
  Down = 'Down',
}

export const size = 300 // размер всей сетки при изм-и надо менять style numberCoords
export const dimMatr = 8 // Matrix dimension 8x8 (размерность)
export const cellSize = size / dimMatr //размер ячейки
export const scaleBoard = 1 //масшатаб игрового поля
export const canvasWidth = size + 70 //ширина всего канваса
export const canvasHeight = size + 100 //высота всего канваса

//время неспешного решения о возможном клике
export const getStepTimeGame = (x: number): string => {
  const y = (x / 1000).toFixed(2)
  return y
}

//время отработки функций
export const getStepTimeWorkFun = (tHandle: number, tDraw: number): string => {
  const y = ((tHandle + tDraw) / 1000).toFixed(4)

  return y
}

export const shipsSet: ShipsSet[] = [
  //размеры кораблей и их количество на доске
  // последовательность строго c size =3 и на уменьшение!!!!
  { size: 3, quantity: 1 },
  { size: 2, quantity: 2 },
  { size: 1, quantity: 3 },
]

const randomMovesComp: CellArgs[] = [] //рандомные ходы компьютера

//проверка трехбалубных яхт идущих исключительно вначале shipsSet!!!!!
export const checkShipsLength3 = (arr: CellArgs[][]): boolean =>
  arr[0][2].x === arr[0][0].x && arr[0][2].y === arr[0][0].y ? true : false

//рисовать ячейку
const drawCell = ({ context, cellSize, x, y }: DrawCellArgs): void => {
  context.beginPath()
  context.strokeStyle = '#aaa'
  context.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
  context.closePath()
}

//рисовать имя доски
export const drawNameBoard = (
  context: CanvasRenderingContext2D,
  font: string,
  name: string,
  pausePlayer?: string,
  pauseComp?: string,
  pauseWorkFunPlayer?: string,
  pauseWorkFunСomp?: string
): void => {
  context.beginPath()
  context.clearRect(0, 340, 300, 60)
  context.rect(0, 340, 300, 60)
  context.fillStyle = 'white'
  context.fill()
  context.fillStyle = 'black'
  context.font = 'italic ' + 12 + 'pt Arial'
  context.fillText(`${font}`, 40, 360)
  context.closePath()
}

//генерировать координаты
export const generateCoords = (cellCount: number): GeneratedCoords => {
  const letterCoords = []
  const numberCoords = []

  for (let i = 1; i <= cellCount; i++) {
    letterCoords.push(String.fromCharCode(64 + i))
    numberCoords.push(i)
  }

  return { letterCoords, numberCoords }
}

//прорисовать координаты букв сетки
export const drawLatterCoords = (
  context: CanvasRenderingContext2D,
  font: string[]
): void => {
  let i = 15
  context.beginPath()
  context.fillStyle = 'black'
  context.font = 'italic ' + 12 + 'pt Arial'
  font.forEach(el => {
    context.fillText(`${el}`, i, 320)
    i += 37
  })
  context.closePath()
}

//прорисовать координаты чисел сетки
export const drawNumberCoords = (
  context: CanvasRenderingContext2D,
  font: number[]
): void => {
  let i = 24
  context.beginPath()
  context.fillStyle = 'black'
  context.font = 'italic ' + 13 + 'pt Arial'
  font.forEach(el => {
    context.fillText(`${el}`, 306, i)
    i += 38
  })
  context.closePath()
}

//прорисовать количесвто оставшихся к уничтожению
export const drawStatusShips = (
  context: CanvasRenderingContext2D,
  name: string,
  countCompShips?: number,
  countPlayerShips?: number
): void => {
  const num = name === 'computer' ? countCompShips : countPlayerShips

  context.beginPath()
  context.fillStyle = 'black'
  context.font = 'italic ' + 11 + 'pt Arial'
  context.fillText(`Осталось уничтожить: ${num}`, 10, 395)
  context.closePath()
}

//прорисовать кто победюн
export const drawWhoWin = (
  context: CanvasRenderingContext2D,
  name: string,
  setPlayerIsWin: React.Dispatch<React.SetStateAction<boolean>>,
  countCompShips?: number,
  countPlayerShips?: number
): void => {
  const str =
    name === 'computer'
      ? countCompShips === 0 && Winner.PLAYER_IS_WIN
      : countPlayerShips === 0 && Winner.COMP_IS_WIN

  if (str === Winner.PLAYER_IS_WIN) setPlayerIsWin(true)

  if (!str) return
  context.beginPath()
  context.clearRect(0, 340, 330, 60)
  context.rect(0, 340, 330, 60)
  context.fillStyle = 'burlywood'
  context.fill()
  context.fillStyle = 'rgb(158, 0, 0)'
  context.font = 'italic ' + 20 + 'pt Arial'
  context.fillText(`${str}`, 10, 370)
  context.closePath()
}

// рисовать ячейки
export const drawCells = ({
  context,
  cellSize,
  dimMatr,
}: DrawCellsArgs): void => {
  for (let x = 0; x < dimMatr; x++) {
    for (let y = 0; y < dimMatr; y++) {
      drawCell({ context, cellSize, x, y })
    }
  }
}

// Ячейка занята
export const cellIsEngaged = ({
  cell,
  engagedCells,
}: CellIsEngagedArgs): boolean =>
  engagedCells &&
  engagedCells.some(({ x, y }: CellArgs) => x === cell.x && y === cell.y)

// заполнить ячейку
const fillCell = ({ context, cellSize, x, y }: DrawCellArgs): void => {
  context.beginPath()
  context.rect((x - 1) * cellSize, (y - 1) * cellSize, cellSize, cellSize)
  context.closePath()
  context.fillStyle = '#ddd'
  context.fill()
  context.stroke()
}

//рисовать корабли
export const drawShips = (
  context: CanvasRenderingContext2D,
  cellSize: number,
  ships: CellArgs[][]
): void => {
  ships &&
    ships.flat().forEach(({ x, y }) => fillCell({ context, cellSize, x, y }))
}

//нарисовать ячейку мимо
export const drawPastCells = (
  context: CanvasRenderingContext2D,
  cellSize: number,
  pastCells: CellArgs[]
): void => {
  pastCells &&
    pastCells.forEach(({ x, y }) => {
      context.beginPath()
      context.arc(
        x * cellSize - cellSize / 2,
        y * cellSize - cellSize / 2,
        4,
        0,
        2 * Math.PI
      )
      context.fillStyle = 'rgb(57, 57, 97)'
      context.stroke()
      context.fill()
      context.closePath()
    })
}

//генерация рандома ячеек
const getRundomCell = (size: number, dimMatr: number): any[] => {
  let currentSize = 1
  const ship = []
  let shipHead = {}

  while (currentSize <= size) {
    shipHead = {
      x: Math.round(Math.random() * (dimMatr - 1) + 1),
      y: Math.round(Math.random() * (dimMatr - 1) + 1),
    }

    ship.push(shipHead)
    currentSize++
  }

  return ship
}

//рандом-генерация кнопки, для произведения "выстрела" компьютером
export const generateRandomCompShot = (): CellArgs => {
  let i = 0
  let rand = getRundomCell(1, dimMatr)[0]

  //проверка на отсутсвие элемента в глобальном randomMovesComp
  const engagedCompShot = randomMovesComp
    .map(({ x, y }) => x === rand.x && y === rand.y)
    .find(el => el === true)

  while (engagedCompShot !== undefined && engagedCompShot === true && i < 1) {
    randomMovesComp.pop()
    rand = getRundomCell(1, dimMatr)[0]
    i++
  }

  randomMovesComp.push(rand) //необходимо запоминать ранее произведенные "выстрелы"

  return rand
}

//затонувшие корабли
export const drawSunkenShips = (
  context: CanvasRenderingContext2D,
  cellSize: number,
  sunkenShips: CellArgs[]
): void => {
  sunkenShips &&
    sunkenShips.forEach(({ x, y }) => {
      fillCell({ context, cellSize, x, y })

      context.beginPath()
      context.moveTo((x - 1) * cellSize, (y - 1) * cellSize)
      context.lineTo(x * cellSize, y * cellSize)
      context.moveTo((x - 1) * cellSize + cellSize, (y - 1) * cellSize)
      context.lineTo(x * cellSize - cellSize, y * cellSize)
      context.strokeStyle = 'black'
      context.fillStyle = 'rgb(255, 82, 82)'
      context.fillRect(
        (x - 1) * cellSize,
        (y - 1) * cellSize,
        cellSize,
        cellSize
      )
      context.stroke()
      context.closePath()
    })
}

//создает ячейку
export const getCell = (coorX: number, coorY: number): CellArgs => {
  return {
    x: Math.ceil(coorX / cellSize / scaleBoard),
    y: Math.ceil(coorY / cellSize / scaleBoard),
  }
}

//ячейка внутри сетки
const cellIsWithin = ({
  cell,
  dimMatr,
}: CellIsWithinArgs): boolean => //ячейка внутри
  cell.x > 0 && cell.x <= dimMatr && cell.y > 0 && cell.y <= dimMatr

//удалить дубликаты
const removeDuplicates = (array: CellArgs[]): CellArgs[] =>
  array.filter(
    (element1: CellArgs, index: number, array: CellArgs[]) =>
      index ===
      array.findIndex(
        (element2: CellArgs) =>
          element2.x === element1.x && element2.y === element1.y
      )
  )

// ячейки вокруг корабля
export const getEngagedCellsAroundShip = (
  ship: CellArgs[],
  engagedCells: CellArgs[],
  dimMatr: number
): CellArgs[] => {
  const engagedCellsAroundShip: CellArgs[] = []

  for (let shipCell = 0; shipCell < ship.length; shipCell++) {
    engagedCellsAroundShip.push({ x: ship[shipCell].x, y: ship[shipCell].y })
    engagedCellsAroundShip.push({
      x: ship[shipCell].x - 1,
      y: ship[shipCell].y - 1,
    })
    engagedCellsAroundShip.push({
      x: ship[shipCell].x,
      y: ship[shipCell].y - 1,
    })
    engagedCellsAroundShip.push({
      x: ship[shipCell].x + 1,
      y: ship[shipCell].y - 1,
    })
    engagedCellsAroundShip.push({
      x: ship[shipCell].x + 1,
      y: ship[shipCell].y,
    })
    engagedCellsAroundShip.push({
      x: ship[shipCell].x + 1,
      y: ship[shipCell].y + 1,
    })
    engagedCellsAroundShip.push({
      x: ship[shipCell].x,
      y: ship[shipCell].y + 1,
    })
    engagedCellsAroundShip.push({
      x: ship[shipCell].x - 1,
      y: ship[shipCell].y + 1,
    })
    engagedCellsAroundShip.push({
      x: ship[shipCell].x - 1,
      y: ship[shipCell].y,
    })
  }

  return removeDuplicates(engagedCellsAroundShip).filter(
    (engagedCell: CellArgs) =>
      cellIsWithin({ cell: engagedCell, dimMatr }) &&
      !cellIsEngaged({ cell: engagedCell, engagedCells })
  )
}

//генерировать схему кораблей
export const generateShipsLayout = (
  shipsSet: ShipsSet[],
  dimMatr: number
): CellArgs[][] => {
  const ships: CellArgs[][] = []
  const engagedCells: CellArgs[] = []
  let directionOfGeneration: DirectionsOfGeneration
  let directionsOfGeneration: DirectionsOfGeneration[] = []

  shipsSet.forEach(({ size, quantity }: ShipsSet) => {
    for (let i = 1; i <= quantity; i++) {
      let ship: CellArgs[] = []
      let currentSize = 1

      while (currentSize <= size) {
        if (currentSize === 1) {
          ship = []
          directionsOfGeneration = Object.keys(DirectionsOfGeneration)
            .map(direction => ({ sort: Math.random(), direction }))
            .sort((d1, d2) => d1.sort - d2.sort)
            .map(({ direction }) => direction as DirectionsOfGeneration)
          let shipHead: CellArgs = {} as CellArgs

          do {
            shipHead = {
              x: Math.round(Math.random() * (dimMatr - 1) + 1),
              y: Math.round(Math.random() * (dimMatr - 1) + 1),
            }
          } while (cellIsEngaged({ cell: shipHead, engagedCells }))

          ship.push(shipHead)
          currentSize++
        } else if (currentSize === 2) {
          let secondShipCell: CellArgs = {} as CellArgs

          do {
            /// @ts-ignore - no undefined!!!!
            directionOfGeneration = directionsOfGeneration.pop()

            switch (directionOfGeneration) {
              case DirectionsOfGeneration.Left: {
                const shipCell: CellArgs = { x: ship[0].x - 1, y: ship[0].y }

                if (
                  cellIsWithin({ cell: shipCell, dimMatr }) &&
                  !cellIsEngaged({ cell: shipCell, engagedCells })
                ) {
                  secondShipCell = shipCell
                }
                break
              }
              case DirectionsOfGeneration.Up: {
                const shipCell: CellArgs = { x: ship[0].x, y: ship[0].y - 1 }

                if (
                  cellIsWithin({ cell: shipCell, dimMatr }) &&
                  !cellIsEngaged({ cell: shipCell, engagedCells })
                ) {
                  secondShipCell = shipCell
                }
                break
              }
              case DirectionsOfGeneration.Right: {
                const shipCell: CellArgs = { x: ship[0].x + 1, y: ship[0].y }

                if (
                  cellIsWithin({ cell: shipCell, dimMatr }) &&
                  !cellIsEngaged({ cell: shipCell, engagedCells })
                ) {
                  secondShipCell = shipCell
                }
                break
              }
              case DirectionsOfGeneration.Down: {
                const shipCell: CellArgs = { x: ship[0].x, y: ship[0].y + 1 }

                if (
                  cellIsWithin({ cell: shipCell, dimMatr }) &&
                  !cellIsEngaged({ cell: shipCell, engagedCells })
                ) {
                  secondShipCell = shipCell
                }
                break
              }
            }
          } while (
            Object.keys(secondShipCell).length &&
            directionsOfGeneration.length
          )

          if (Object.keys(secondShipCell).length) {
            ship.push(secondShipCell)
            currentSize++
          } else {
            currentSize = 1
          }
        } else {
          let nextShipCell: CellArgs = {} as CellArgs

          switch (directionOfGeneration) {
            case DirectionsOfGeneration.Left: {
              const shipCell: CellArgs = {
                x: ship[currentSize - 1 - 1].x - 1,
                y: ship[currentSize - 1 - 1].y,
              }

              if (
                cellIsWithin({ cell: shipCell, dimMatr }) &&
                !cellIsEngaged({ cell: shipCell, engagedCells })
              ) {
                nextShipCell = shipCell
              }
              break
            }
            case DirectionsOfGeneration.Up: {
              const shipCell: CellArgs = {
                x: ship[currentSize - 1 - 1].x,
                y: ship[currentSize - 1 - 1].y - 1,
              }

              if (
                cellIsWithin({ cell: shipCell, dimMatr }) &&
                !cellIsEngaged({ cell: shipCell, engagedCells })
              ) {
                nextShipCell = shipCell
              }
              break
            }
            case DirectionsOfGeneration.Right: {
              const shipCell: CellArgs = {
                x: ship[currentSize - 1 - 1].x + 1,
                y: ship[currentSize - 1 - 1].y,
              }

              if (
                cellIsWithin({ cell: shipCell, dimMatr }) &&
                !cellIsEngaged({ cell: shipCell, engagedCells })
              ) {
                nextShipCell = shipCell
              }
              break
            }
            case DirectionsOfGeneration.Down: {
              const shipCell: CellArgs = {
                x: ship[currentSize - 1 - 1].x,
                y: ship[currentSize - 1 - 1].y + 1,
              }

              if (
                cellIsWithin({ cell: shipCell, dimMatr }) &&
                !cellIsEngaged({ cell: shipCell, engagedCells })
              ) {
                nextShipCell = shipCell
              }
              break
            }
          }

          if (Object.keys(nextShipCell).length) {
            ship.push(nextShipCell)
            currentSize++
          } else {
            currentSize = 1
          }
        }
      }

      const engagedCellsAroundShip: CellArgs[] = getEngagedCellsAroundShip(
        ship,
        engagedCells,
        dimMatr
      )

      engagedCells.push(...engagedCellsAroundShip)
      ships.push(ship)
    }
  })

  return ships
}

export const musicControl = (sound: HTMLAudioElement | null, ms = 1000) => {
  if (sound) {
    sound.play()
    setTimeout(() => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0
      }
    }, ms)
  }
}