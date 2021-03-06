/* eslint-env jest */

const monads = require('./monads')
const { chain, chainM, id, chainP, zip, randomInt, repeat, Builder } = require('./common')

test('common', () => {
  const one = [1, 2]
  const two = ['a', 'b']
  const three = [3, 4]

  expect(zip(one)).toEqual([
    [1, 2]
  ])

  expect(zip(one, two)).toEqual([
    [1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']
  ])

  expect(zip(one, three)).toEqual([
    [1, 3], [1, 4], [2, 3], [2, 4]
  ])

  expect(zip(one, two, three)).toEqual([
    [1, 'a', 3], [1, 'a', 4], [1, 'b', 3], [1, 'b', 4],
    [2, 'a', 3], [2, 'a', 4], [2, 'b', 3], [2, 'b', 4]
  ])

  expect(randomInt(1)).toEqual(0)
  expect(randomInt(1, 1)).toEqual(1)

  repeat(50, () => expect(randomInt(5)).toBeLessThan(5))
  repeat(50, () => expect(randomInt(5, 1)).toBeLessThan(6))

  expect(repeat(3, i => `${i}!`)).toEqual(['0!', '1!', '2!'])
})

test('chainP', async () => {
  await chainP()(
    x => expect(x).toEqual(undefined)
  )

  await chainP('hi')(
    x => expect(x).toEqual('hi')
  )

  await chainP(Promise.resolve('hi'))(
    x => expect(x).toEqual('hi')
  )
})

test('chain', () => {
  chain(id, x => expect(x).toBeUndefined())()
  chain(id, x => expect(x).toBeNull())(null)
})

test('chainM', () => {
  chainM(monads.Id)(id, x => expect(x).toBeUndefined())()
  chainM(monads.Id)(id, x => expect(x).toBeNull())(null)
})

describe('Builder', () => {
  it('accumulates a config object for a function', () => {
    const factory = config => value => `${value} ${config.one} ${config.two}`

    const build = Builder(factory)

    expect(
      build(
        () => ({ one: 'one', two: 'two' })
      )('hi')
    ).toEqual(
      'hi one two'
    )

    expect(
      build(
        () => ({ one: 'one' }),
        () => ({ two: 'two' })
      )('hi')
    ).toEqual(
      'hi one two'
    )

    expect(
      build(
        () => ({ one: 'one' }),
        config => ({ two: config.one.toUpperCase() })
      )('hi')
    ).toEqual(
      'hi one ONE'
    )
  })
})
