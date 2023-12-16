
import {expect, describe, it} from '@jest/globals'
import {
    getNewRoverPosition,
    getXPositionOnGrid,
    getYPositionOnGrid,
    getDirectionOnGrid,
    getNewDirectionOnGrid,
    getNewPositionOnGrid,
    playGame
} from "./mars-rover.js";

// display initial position and direction on grid
describe('given an input', () => {
    it('should display Y position on grid', () => {
        //arrange
        const input = '1 2 N'

        //act
        const position = getYPositionOnGrid(input)

        //expect
        expect(position).toBe(2)
    })

    it('should display X position on grid', () => {
        //arrange
        const input = '1 2 N'

        //act
        const position = getXPositionOnGrid(input)

        //expect
        expect(position).toBe(1)
    })

    it('should display direction on grid', () => {
        //arrange
        const input = '1 2 N'

        //act
        const direction = getDirectionOnGrid(input)

        //expect
        expect(direction).toBe('N')
    })
})

// movement requests tests
describe('given an L movement request', () => {
    it.each`
        initialDirection | newDirection
        ${'N'} | ${'W'}
        ${'E'} | ${'N'}
        ${'S'} | ${'E'}
        ${'W'} | ${'S'}
    `("should change direction from $initialDirection to $newDirection", ({initialDirection, newDirection}) => {
        const direction = initialDirection

        const result = getNewDirectionOnGrid(direction, 'L')

        expect(result).toBe(newDirection)
    })
})
describe('given an R movement request', () => {
    it.each`
        initialDirection | newDirection
        ${'N'} | ${'E'}
        ${'E'} | ${'S'}
        ${'S'} | ${'W'}
        ${'W'} | ${'N'}
    `("should change direction from $initialDirection to $newDirection", ({initialDirection, newDirection}) => {
        const direction = initialDirection

        const result = getNewDirectionOnGrid(direction, 'R')

        expect(result).toBe(newDirection)
    })
})

describe.each`
    x | y | direction | newPosition
    ${1} | ${2} | ${'N'} | ${{x: 1, y: 3}}
    ${1} | ${2} | ${'S'} | ${{x: 1, y: 1}}
    ${1} | ${2} | ${'W'} | ${{x: 0, y: 2}}
    ${1} | ${2} | ${'E'} | ${{x: 2, y: 2}}
    ${1} | ${0} | ${'S'} | ${{x: 1, y: 5}}
    ${1} | ${5} | ${'N'} | ${{x: 1, y: 0}}
    ${0} | ${2} | ${'W'} | ${{x: 5, y: 2}}
    ${5} | ${2} | ${'E'} | ${{x: 0, y: 2}}
    `('and a step movement request', ({x, y, direction, newPosition}) => {
    it('should display new position on grid', () => {
        const position = getNewPositionOnGrid(x, y, direction)

        expect(position).toEqual(newPosition)
    })
})

// get new rover position
describe.each`
    input | moveTo | output
    ${'1 2 N'} | ${'L'} | ${'1 2 W'}
    ${'1 2 N'} | ${'R'} | ${'1 2 E'}
    ${'1 2 N'} | ${'M'} | ${'1 3 N'}
  `('given an input and a movement request', ({input, moveTo, output}) => {
    it('should set a new rover position on the grid', () => {
        //act
        const position = getNewRoverPosition(input, moveTo)

        //expect
        expect(position).toBe(output)
    })
})

// play game tests
describe.each`
    input | moveTo | output
    ${'1 2 N'} | ${'LM'} | ${'0 2 W'}
    ${'1 2 N'} | ${'LMLMLMLMM'} | ${'1 3 N'}
    ${'3 3 E'} | ${'MMRMMRMRRM'} | ${'5 1 E'}
  `('given an input and a request set of movements', ({input, moveTo, output}) => {
    it('should position rover correctly on the grid', () => {
        //act
        const position = playGame(input, moveTo)

        //expect
        expect(position).toBe(output)
    })
})
