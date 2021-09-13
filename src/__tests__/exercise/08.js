// testing custom hooks
// http://localhost:3000/counter-hook

// import * as React from 'react'
// import {render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import TestRenderer from 'react-test-renderer';
import {renderHook} from '@testing-library/react-hooks'

// function setup(...args) {
//   const returnVal = {}
//   function TestComponent() {
//     Object.assign(returnVal, useCounter(...args))
//     return null
//   }
//   render(<TestComponent />)
//   return returnVal
// }
const {act} = TestRenderer;

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(() => useCounter())
  expect(result.current.count).toEqual(0)
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toEqual(1)
  act(() => {
    result.current.decrement()
  })
  expect(result.current.count).toEqual(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(() => useCounter({initialCount: 5}))

  expect(result.current.count).toEqual(5)
})

test('allows customization of the step', () => {
  const {result, rerender} = renderHook(useCounter, {
    initialProps: {step: 5},
  })
  console.log(result.current.count)
  expect(result.current.count).toBe(0)
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(5)
  rerender({step: 3})
  act(() => {
    result.current.decrement()
  })
  expect(result.current.count).toBe(2)

})

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// function Counter() {
//   const {count, increment, decrement} = useCounter()
//   return (
//     <div>
//       <div>Current count: {count}</div>
//       <button onClick={decrement}>Decrement</button>
//       <button onClick={increment}>Increment</button>
//     </div>
//   )
// }

// test('exposes the count and increment/decrement functions', () => {
//   // 🐨 render the component
//   render(<Counter/>)
//   // 🐨 get the elements you need using screen
//   // screen.debug()
//   const message = screen.getByText(/current count/i)
//   const decrement = screen.getByRole('button', {name: /decrement/i})
//   const increment = screen.getByRole('button', {name: /increment/i})
//   // 🐨 assert on the initial state of the hook
//   expect(message).toHaveTextContent('Current count: 0')

//   // 🐨 interact with the UI using userEvent and assert on the changes in the UI
//   userEvent.click(increment)
//   userEvent.click(decrement)
//   expect(message).toHaveTextContent('Current count: 0')
// })

/* eslint no-unused-vars:0 */
