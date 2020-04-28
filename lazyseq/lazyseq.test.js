/* eslint-env jest */

const { LazySeq } = require('./lazyseq')
const monads = require('../monads')
const { Nothing } = require('../types/maybe')

describe('LazySeq', () => {
  it('do', () => {
    const data = () => [1, 2, 3].values()

    const transform = LazySeq(data)
      .withM(
        monads.composeM(monads.FlatSequence)(monads.Maybe)
      )
      .map(i => i + 1)

    expect(transform.take(4)).toEqual([2, 3, 4])
    expect(transform.take(3)).toEqual([2, 3, 4])
    expect(transform.take(2)).toEqual([2, 3])
    expect(transform.take(1)).toEqual([2])
    expect(transform.take(0)).toEqual([])

    transform
      .map(i => `${i}`)

    expect(transform.take(4)).toEqual(['2', '3', '4'])
    expect(transform.take(3)).toEqual(['2', '3', '4'])
    expect(transform.take(2)).toEqual(['2', '3'])
    expect(transform.take(1)).toEqual(['2'])
    expect(transform.take(0)).toEqual([])

    transform
      .map(i => i === '3' ? undefined : `${i}!`)
      .map(i => `@${i}`)

    expect(transform.take(4)).toEqual(['@2!', '@4!'])
    expect(transform.take(3)).toEqual(['@2!', '@4!'])
    expect(transform.take(2)).toEqual(['@2!'])
    expect(transform.take(1)).toEqual(['@2!'])
    expect(transform.take(0)).toEqual([])

    transform
      .map(i => [i, i])
      .map(i => `🤪${i}`)

    expect(transform.take(4)).toEqual(['🤪@2!', '🤪@2!', '🤪@4!', '🤪@4!'])
    expect(transform.take(3)).toEqual(['🤪@2!', '🤪@2!', '🤪@4!', '🤪@4!'])
    expect(transform.take(2)).toEqual(['🤪@2!', '🤪@2!'])
    expect(transform.take(1)).toEqual(['🤪@2!', '🤪@2!'])
    expect(transform.take(0)).toEqual([])

    transform
      .map(i => [null, undefined, '😫'])
      .map(i => `${i}!`)

    expect(transform.take(1)).toEqual([
      Nothing, Nothing, '😫!', Nothing, Nothing, '😫!'
    ])
  })
})
