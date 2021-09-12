// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()

  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)

  // 🐨 get the username and password fields via `getByLabelText`

  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want

  // const buildLoginForm = (data) => ({
  //   username: data.username || faker.internet.userName(),
  //   password: data.password || faker.internet.password(),
  // })

  const buildLoginForm = build({
    fields: {
      username: fake(faker => faker.internet.userName()),
      password: fake(faker => faker.internet.password()),
    },
  });

  const {username, password} = buildLoginForm()
  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  // 🐨 click on the button with the text "Submit"
  const submit = screen.getByRole('button', {name: /submit/i})

  userEvent.click(submit)
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  expect(handleSubmit).toHaveBeenCalledWith({
    username: username,
    password: password,
  })

})

/*
eslint
  no-unused-vars: "off",
*/
