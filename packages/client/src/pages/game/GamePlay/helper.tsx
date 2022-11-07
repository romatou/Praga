export const shipsSet = [
    { size: 1, quantity: 8 }
];

//рисовать ячейку
const drawCell = ({ context, cellSize, x, y }) => {
    context.strokeStyle = "#aaa";
    context.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
};

// рисовать ячейки
export const drawCells = ({ context, cellSize, dimMatr }) => {
    for (let x = 0; x < dimMatr; x++) {
        for (let y = 0; y < dimMatr; y++) {
            drawCell({ context, cellSize, x, y });
        }
    }
};

// Ячейка занята
export const cellIsEngaged = ({ cell, engagedCells }) => engagedCells.some(
    ({ x, y }) => x === cell.x && y === cell.y);

// заполнить ячейку
const fillCell = ({ context, cellSize, x, y }) => {
    context.beginPath();
    context.rect((x - 1) * cellSize, (y - 1) * cellSize, cellSize, cellSize);
    context.closePath();
    context.fillStyle = "#ddd";
    context.fill();
    context.stroke();
};

//рисовать корабли
export const drawShips = (context, cellSize, ships) => {
    ships
        .flat()
        .forEach(({ x, y }) => fillCell({ context, cellSize, x, y }));
};


export const generateShipsLayout = (shipsSet, dimMatr) => {
    let ships = [];
    let engagedCells = [];

    shipsSet.map(({ size, quantity }) => {
        for (let number = 1; number <= quantity; number++) {
            let ship = [];
            let currentSize = 1;

            while (currentSize <= size) {
                if (currentSize === 1) {
                    ship = [];
                    let shipHead = {};

                    do {
                        shipHead = {
                            x: Math.round(Math.random() * (dimMatr - 1) + 1),
                            y: Math.round(Math.random() * (dimMatr - 1) + 1),
                        };
                    } while (cellIsEngaged({ cell: shipHead, engagedCells }));

                    ship.push(shipHead);
                    currentSize++;
                }
            }

            ships.push(ship);
        }
    });

    return ships;
};

//затонувшие корабли
export const drawSunkenShips = ({ context, cellSize, sunkenShips }) => {
    sunkenShips.forEach(({ x, y }) => {
        fillCell({ context, cellSize, x, y });

        context.beginPath();
        context.moveTo((x - 1) * cellSize, (y - 1) * cellSize);
        context.lineTo(x * cellSize, y * cellSize);
        context.closePath();
        context.strokeStyle = "#aaa";
        context.stroke();
    });
};

//нарисовать прошлую ячейку
export const drawPastCells = ({ context, cellSize, pastCells }) => {
    pastCells.forEach(({ x, y }) => {
        context.beginPath();
        context.arc(
            x * cellSize - cellSize / 2,
            y * cellSize - cellSize / 2,
            2,
            0,
            2 * Math.PI
        );
        context.closePath();
        context.fillStyle = "#000";
        context.fill();
    });
};

export const cellSetsIsEqual = (set1, set2) =>
    set1.length === set2.length &&
    set1.every((cellSet1) =>
        set2.find(
            (cellSet2) =>
                cellSet1.x === cellSet2.x && cellSet1.y === cellSet2.y
        )
    );