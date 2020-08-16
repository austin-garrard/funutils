const { id } = require('./common')

const map = function (f) {
  return caseMap({
    nothing: () => nothing,
    just: value => Just(f(value))
  })(this)
}
const Just = function (value) {
  if (!(this instanceof Just)) {
    return new Just(value)
  }

  this.value = value
}
Just.prototype = {
  map
}

const Nothing = function () {
}
Nothing.prototype = {
  map
}

const isMaybe = x => x instanceof Just || x instanceof Nothing

const nothing = new Nothing()

const Maybe = x => {
  return isMaybe(x)
    ? x
    : x || x === 0
      ? Just(x)
      : nothing
}

const caseMap = cases => maybe => {
  if (maybe instanceof Just) {
    return cases.just(maybe.value)
  }

  if (maybe instanceof Nothing) {
    return cases.nothing ? cases.nothing() : nothing
  }

  throw new TypeError(`Not a Maybe: '${maybe}'`)
}

const given = (...ms) => f => {
  const maybeArgs = ms.reduce(
    (maybeArgs, m) => caseMap({
      just: v => maybeArgs.map(args => args.concat(v))
    })(m),
    Just([])
  )

  return caseMap({
    just: args => Just(f(...args))
  })(maybeArgs)
}

const none = (...ms) => f => {
  const maybeArgs = ms.reduce(
    (maybeArgs, m) => caseMap({
      just: () => m,
      nothing: () => maybeArgs.map(id)
    })(m),
    nothing
  )

  return caseMap({
    just: () => nothing,
    nothing: () => Just(f())
  })(maybeArgs)
}

module.exports = {
  Just,
  Nothing: nothing,
  caseMap,
  isMaybe,
  Maybe,
  given,
  none
}
