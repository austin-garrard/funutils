/* eslint-env jest */

const { chainF } = require('./common')
const colors = require('./colors')

describe('colors', () => {
  const { ESC } = colors

  describe('Color', () => {
    const { Color } = colors
    it('does nothing with no params', () => {
      expect(
        Color()('hi')
      ).toEqual(
        'hi'
      )
    })

    it('sets the foreground', () => {
      expect(
        Color({ fg: 77 })('hi')
      ).toEqual(
        `${ESC}38;5;77mhi${ESC}0m`
      )

      expect(Color({ fg: colors.Black })('hi')).toEqual(`${ESC}38;5;0mhi${ESC}0m`)
      expect(Color({ fg: colors.Red })('hi')).toEqual(`${ESC}38;5;1mhi${ESC}0m`)
      expect(Color({ fg: colors.Yellow })('hi')).toEqual(`${ESC}38;5;3mhi${ESC}0m`)
      expect(Color({ fg: colors.Blue })('hi')).toEqual(`${ESC}38;5;21mhi${ESC}0m`)
      expect(Color({ fg: colors.Green })('hi')).toEqual(`${ESC}38;5;34mhi${ESC}0m`)
      expect(Color({ fg: colors.Teal })('hi')).toEqual(`${ESC}38;5;51mhi${ESC}0m`)
      expect(Color({ fg: colors.Purple })('hi')).toEqual(`${ESC}38;5;90mhi${ESC}0m`)
      expect(Color({ fg: colors.Pink })('hi')).toEqual(`${ESC}38;5;165mhi${ESC}0m`)
      expect(Color({ fg: colors.White })('hi')).toEqual(`${ESC}38;5;231mhi${ESC}0m`)
      expect(Color({ fg: colors.DarkGray })('hi')).toEqual(`${ESC}38;5;242mhi${ESC}0m`)
      expect(Color({ fg: colors.Gray })('hi')).toEqual(`${ESC}38;5;247mhi${ESC}0m`)
      expect(Color({ fg: colors.LightGray })('hi')).toEqual(`${ESC}38;5;254mhi${ESC}0m`)
    })

    it('sets the background', () => {
      expect(
        Color({ bg: 77 })('hi')
      ).toEqual(
        `${ESC}48;5;77mhi${ESC}0m`
      )

      expect(Color({ bg: colors.Black })('hi')).toEqual(`${ESC}48;5;0mhi${ESC}0m`)
      expect(Color({ bg: colors.Red })('hi')).toEqual(`${ESC}48;5;1mhi${ESC}0m`)
      expect(Color({ bg: colors.Yellow })('hi')).toEqual(`${ESC}48;5;3mhi${ESC}0m`)
      expect(Color({ bg: colors.Blue })('hi')).toEqual(`${ESC}48;5;21mhi${ESC}0m`)
      expect(Color({ bg: colors.Green })('hi')).toEqual(`${ESC}48;5;34mhi${ESC}0m`)
      expect(Color({ bg: colors.Teal })('hi')).toEqual(`${ESC}48;5;51mhi${ESC}0m`)
      expect(Color({ bg: colors.Purple })('hi')).toEqual(`${ESC}48;5;90mhi${ESC}0m`)
      expect(Color({ bg: colors.Pink })('hi')).toEqual(`${ESC}48;5;165mhi${ESC}0m`)
      expect(Color({ bg: colors.White })('hi')).toEqual(`${ESC}48;5;231mhi${ESC}0m`)
      expect(Color({ bg: colors.DarkGray })('hi')).toEqual(`${ESC}48;5;242mhi${ESC}0m`)
      expect(Color({ bg: colors.Gray })('hi')).toEqual(`${ESC}48;5;247mhi${ESC}0m`)
      expect(Color({ bg: colors.LightGray })('hi')).toEqual(`${ESC}48;5;254mhi${ESC}0m`)
    })

    it('sets the style', () => {
      expect(
        Color({ style: 1 })('hi')
      ).toEqual(
        `${ESC}1mhi${ESC}0m`
      )

      expect(Color({ style: colors.Bold })('hi')).toEqual(`${ESC}1mhi${ESC}0m`)
      expect(Color({ style: colors.Dim })('hi')).toEqual(`${ESC}2mhi${ESC}0m`)
      expect(Color({ style: colors.Underline })('hi')).toEqual(`${ESC}4mhi${ESC}0m`)
      expect(Color({ style: colors.Blink })('hi')).toEqual(`${ESC}5mhi${ESC}0m`)
      expect(Color({ style: colors.Reverse })('hi')).toEqual(`${ESC}7mhi${ESC}0m`)
      expect(Color({ style: colors.Hidden })('hi')).toEqual(`${ESC}8mhi${ESC}0m`)
    })

    it('sets the foreground and style', () => {
      expect(
        Color({ fg: 77, style: 1 })('hi')
      ).toEqual(
        `${ESC}1;38;5;77mhi${ESC}0m`
      )
    })

    it('sets the background and style', () => {
      expect(
        Color({ bg: 77, style: 1 })('hi')
      ).toEqual(
        `${ESC}1;48;5;77mhi${ESC}0m`
      )
    })

    it('sets the foreground and background', () => {
      expect(
        Color({ fg: 66, bg: 77 })('hi')
      ).toEqual(
        `${ESC}38;5;66m${ESC}48;5;77mhi${ESC}0m${ESC}0m`
      )
    })

    it('sets the foreground and background and style', () => {
      expect(
        Color({ fg: 66, bg: 77, style: 1 })('hi')
      ).toEqual(
        `${ESC}1;38;5;66m${ESC}48;5;77mhi${ESC}0m${ESC}0m`
      )
    })
  })

  describe('ColorF, Colors, ColorsWith', () => {
    const { ColorF, Colors, ColorsWith, fg, bg, style } = colors

    it('does nothing with no mappings', () => {
      const expectedResult = 'hi'

      expect(
        ColorF().apply('hi')
      ).toEqual(expectedResult)

      expect(
        Colors()('hi')
      ).toEqual(expectedResult)
    })

    it('sets the foreground', () => {
      const expectedResult = `${ESC}38;5;77mhi${ESC}0m`

      expect(
        ColorF()
          .map(() => ({ fg: 77 }))
          .apply('hi')
      ).toEqual(expectedResult)

      expect(
        ColorF()
          .map(fg(77))
          .apply('hi')
      ).toEqual(expectedResult)

      expect(
        Colors(fg(77))('hi')
      ).toEqual(expectedResult)
    })

    it('sets the background', () => {
      const expectedResult = `${ESC}48;5;77mhi${ESC}0m`

      expect(
        ColorF()
          .map(() => ({ bg: 77 }))
          .apply('hi')
      ).toEqual(expectedResult)

      expect(
        ColorF()
          .map(bg(77))
          .apply('hi')
      ).toEqual(expectedResult)

      expect(
        Colors(bg(77))('hi')
      ).toEqual(expectedResult)
    })

    it('sets the style', () => {
      const expectedResult = `${ESC}1mhi${ESC}0m`

      expect(
        ColorF()
          .map(() => ({ style: 1 }))
          .apply('hi')
      ).toEqual(expectedResult)

      expect(
        ColorF()
          .map(style(1))
          .apply('hi')
      ).toEqual(expectedResult)

      expect(
        Colors(style(1))('hi')
      ).toEqual(expectedResult)
    })

    it('sets all attributes', () => {
      const expectedResult = `${ESC}1;38;5;66m${ESC}48;5;77mhi${ESC}0m${ESC}0m`

      expect(
        ColorF()
          .map(fg(66))
          .map(bg(77))
          .map(style(1))
          .apply('hi')
      ).toEqual(expectedResult)

      expect(
        chainF(ColorF())(
          fg(66),
          bg(77),
          style(1)
        ).apply('hi')
      ).toEqual(expectedResult)

      expect(
        Colors(fg(66), bg(77), style(1))('hi')
      ).toEqual(expectedResult)

      expect(
        Colors(style(1), bg(77), fg(66))('hi')
      ).toEqual(expectedResult)

      expect(
        ColorsWith()(style(1), bg(77), fg(66))('hi')
      ).toEqual(expectedResult)

      expect(
        ColorsWith(style(1))(bg(77), fg(66))('hi')
      ).toEqual(expectedResult)

      expect(
        ColorsWith(style(1), bg(77), fg(66))()('hi')
      ).toEqual(expectedResult)
    })

    it('overwrites previously set values', () => {
      const expectedResult = `${ESC}1;38;5;66m${ESC}48;5;77mhi${ESC}0m${ESC}0m`

      expect(
        Colors(fg(111), bg(222), style(1), bg(77), fg(66))('hi')
      ).toEqual(expectedResult)

      expect(
        ColorsWith(bg(77), fg(9999))(style(1), fg(66))('hi')
      ).toEqual(expectedResult)

      expect(
        ColorsWith(bg(77))(style(1), fg(9999), fg(66))('hi')
      ).toEqual(expectedResult)

      expect(
        ColorsWith(fg(9999), style(1), bg(77), fg(66))()('hi')
      ).toEqual(expectedResult)
    })
  })
})
