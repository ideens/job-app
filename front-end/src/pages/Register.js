import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import { Form, Col, Container } from 'react-bootstrap'

const Register = () => {
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/register', formData)
      console.log('DATA', data)
      handleSuccessfulRegister()
    } catch (err) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.passwordConfirmation
      ) {
        setError('Please check you have filled out all fields.')
      } else {
        setError('Error registering.')
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSuccessfulRegister = () => {
    console.log('SUCCESSFULLY REGISTERED')
    navigate('/login')
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            placeholder="Your Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            placeholder="Confirm password"
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
      <p>{error}</p>
    </div>

    // <div>
    //   <Container>
    //     <Form onSubmit={handleSubmit}>
    //       <Form.Group as={Col} className="mb-3" controlId="form.Name">
    //         <Form.Label className="label">First Name</Form.Label>

    //         <Form.Control
    //           placeholder="First Name"
    //           type="text"
    //           name="firstName"
    //           value={formData.firstName}
    //           onChange={handleChange}
    //         />
    //       </Form.Group>
    //       <Form.Group className="mb-3" controlId="form.Name">
    //         <Form.Label className="label">Last Name</Form.Label>
    //         <Form.Control
    //           placeholder="Last Name"
    //           type="text"
    //           name="lastName"
    //           value={formData.lastName}
    //           onChange={handleChange}
    //         />
    //       </Form.Group>
    //       <Form.Group className="mb-3" controlId="form.Email">
    //         <Form.Label className="label">Email</Form.Label>

    //         <Form.Control
    //           placeholder="Your Email"
    //           type="email"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //         />
    //       </Form.Group>
    //       <Form.Group>
    //         <Form.Label className="label">Password</Form.Label>

    //         <Form.Control
    //           placeholder="Password"
    //           type="password"
    //           name="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //         />
    //       </Form.Group>
    //       <Form.Group>
    //         <Form.Label className="label">Confirm password</Form.Label>

    //         <Form.Control
    //           placeholder="Confirm password"
    //           type="password"
    //           name="passwordConfirmation"
    //           value={formData.passwordConfirmation}
    //           onChange={handleChange}
    //         />
    //       </Form.Group>
    //       <Form.Group>
    //         <Form.Control type="submit" value="Register" />
    //       </Form.Group>
    //     </Form>
    //   </Container>
    // </div>
  )
}

export default Register
