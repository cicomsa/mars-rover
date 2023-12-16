export const grid = {
    y: [0,1,2,3,4,5],
    x: [0,1,2,3,4,5],
    direction: ['N', 'E', 'S', 'W']
}
export const getXPositionOnGrid = (input) => {
    const splitInput = input.split(' ')
    const position = grid["x"].find(element => element === Number(splitInput[0]))
    return position;
}
export const getYPositionOnGrid = (input) => {
    const splitInput = input.split(' ')
    const position = grid["y"].find(element => element === Number(splitInput[1]))
    return position;
}
export const getDirectionOnGrid = (input) => {
    const splitInput = input.split(' ')
    const direction = grid["direction"].find(element => element === splitInput[2])
    return direction;
}
const getNewDirectionIndex = (initialDirectionIndex, moveTo) => {
    switch(moveTo) {
        case 'L':
            return initialDirectionIndex === 0 ? 3 : initialDirectionIndex - 1
        case 'R':
            return initialDirectionIndex === 3 ? 0 : initialDirectionIndex + 1
        default:
            return initialDirectionIndex
    }
}
export const getNewDirectionOnGrid = (direction, moveTo) => {
    const initialDirectionIndex = grid['direction'].indexOf(direction)
    const newDirectionIndex = getNewDirectionIndex(initialDirectionIndex, moveTo)
    const newDirection = grid['direction'][newDirectionIndex]
    return newDirection
}
export const getNewPositionOnGrid = (x, y, direction) => {
    switch(direction) {
        case 'N':
            return {x, y: y + 1}
        case 'S':
            return {x, y: y - 1}
        case 'E':
            return {x: x + 1, y}
        case 'W':
            return {x: x - 1, y}
        default:
            return {x, y}

    }
}
export const getNewRoverPosition = (input, moveTo) => {
    let x = getXPositionOnGrid(input)
    let y = getYPositionOnGrid(input)
    let direction = getDirectionOnGrid(input)

    if (['L', 'R'].includes(moveTo)) direction = getNewDirectionOnGrid(direction, moveTo)
    if (moveTo === 'M') {
        const position = getNewPositionOnGrid(x, y, direction)
        x = position.x
        y = position.y
    }

    return `${x} ${y} ${direction}`
}
export const playGame = (input, moveTo) => {
    let newInput = input

    const moveToArray = moveTo.split('')

    moveToArray.forEach(element => {
        newInput = getNewRoverPosition(newInput, element)
    })

    return newInput
}