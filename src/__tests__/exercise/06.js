// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
// beforeAll(() => {
//   window.navigator.geolocation = {getCurrentPosition: jest.fn()}
// })

// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.
// function deferred() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => {
//     resolve = res
//     reject = rej
//   })
//   return {promise, resolve, reject}
// }
// 💰 Here's an example of how you use this:
// const {promise, resolve, reject} = deferred()
// promise.then(() => {/* do something */})
// // do other setup stuff and assert on the pending state
// resolve()
// await promise
// // assert on the resolved state

test('displays the users current location', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {coords: {
    latitude: 10,
    longitude: 10,
  }
}

let setReturnValue;
function useMockCurrentPosition() {
  const state = React.useState([])
  setReturnValue = state[1]
  return state[0]
}
useCurrentPosition.mockImplementation(useMockCurrentPosition)

  // 🐨 create a deferred promise here
  // const {promise, resolve} = deferred()


  // 🐨 Now we need to mock the geolocation's getCurrentPosition function
  // To mock something you need to know its API and simulate that in your mock:
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  //
  // here's an example of the API:
  // function success(position) {}
  // function error(error) {}
  // navigator.geolocation.getCurrentPosition(success, error)

  // 🐨 so call mockImplementation on getCurrentPosition
  // 🐨 the first argument of your mock should accept a callback
  // 🐨 you'll call the callback when the deferred promise resolves
  // window.navigator.geolocation.getCurrentPosition.mockImplementation(callback => {promise.then(() => callback(fakePosition))})

  // 🐨 now that setup is done, render the Location component itself
  render(<Location />)

  // 🐨 verify the loading spinner is showing up
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  // 💰 tip: try running screen.debug() to know what the DOM looks like at this point.
  // screen.debug()
  
  // 🐨 resolve the deferred promise
  // resolve()
  // 🐨 wait for the promise to resolve
  // await promise
  
  // 💰 right around here, you'll probably notice you get an error log in the
  // test output. You can ignore that for now and just add this next line:
  act(() => {
    setReturnValue([fakePosition])
  })
  //
  // If you'd like, learn about what this means and see if you can figure out
  // how to make the warning go away (tip, you'll need to use async act)
  // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  //
  // 🐨 verify the loading spinner is no longer in the document
  //    (💰 use queryByLabelText instead of getByLabelText)
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  
  // 🐨 verify the latitude and longitude appear correctly
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})

/*
eslint
  no-unused-vars: "off",
*/
