// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import { screen} from '@testing-library/react'
import {render} from '../../test/test-utils'
import EasyButton from '../../components/easy-button'
// import {ThemeProvider} from '../../components/theme'

// function Wrapper({children, theme}) {
//   return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
// }

// function render(ui, options) {
//   console.log("TEST options", options.theme)
//   return rtlRender(ui, { wrapper: props => <Wrapper {...props} theme={options.theme} />, ...options })
// }

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:

 
  render(<EasyButton>Easy</EasyButton>, {theme: 'light' })
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
  //
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})

test('renders with the dark styles for the dark theme', () => {
  render(<EasyButton>Easy</EasyButton>, {theme: 'dark' })
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

/* eslint no-unused-vars:0 */
