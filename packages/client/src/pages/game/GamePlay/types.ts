export type ShipsSet = {
  size: number
  quantity: number
}

export type CellArgs = {
  x: number
  y: number
}

type ContextArgs = {
  context: CanvasRenderingContext2D
  cellSize: number
}

export type DrawCellArgs = ContextArgs & CellArgs

export type DrawCellsArgs = ContextArgs & {
  dimMatr: number
}

export type GeneratedCoords = {
  letterCoords: string[]
  numberCoords: number[]
}

export type CellIsEngagedArgs = {
  cell: CellArgs
  engagedCells: CellArgs[]
}

export type BoardProps = {
  name: string
  nameBoard: string
  playerShips?: CellArgs[][]
  compShips?: CellArgs[][]
  coords: GeneratedCoords
  gameIsFinished: boolean
}

export enum DirectionsOfGeneration {
  Left = 'Left',
  Up = 'Up',
  Right = 'Right',
  Down = 'Down',
}

export type CellIsWithinArgs = {
  cell: CellArgs
  dimMatr: number
}

export enum Winner {
  PLAYER_IS_WIN = 'Вы победитель!!!',
  COMP_IS_WIN = 'Компутер красавчик!!!',
}
