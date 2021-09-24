import React, { useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'

import { gql, useMutation } from '@apollo/client';

const REGISTER_USER = gql`
  mutation register($username: String! $email: String! $password: String! $confirmPassword: String!) {
    register(username: $username email: $email password: $password confirmPassword: $confirmPassword) {
      username
      email
      createdAt
    }
  }
`;

export default function Register(props) {
    const [variablesx, setVariables] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      })

      const [errors, setErrors] = useState({})
    
      const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
          update(_, res) {
              props.history.push('/login')
          },
          onError(error) {
            console.log('onError',error.graphQLErrors[0])
            setErrors(error.graphQLErrors[0].extensions.errors)
          }
      });
      const submitRegisterForm = async (e) => {
        e.preventDefault()
        registerUser({variables: variablesx})
        console.log(variablesx)
      }
    return (
        <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
            <h1 className="text-center">Register</h1>
            <Form onSubmit={submitRegisterForm}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={errors.email && 'text-danger'}>
                  {errors.email || 'Email address' }
                </Form.Label>
                <Form.Control 
                  type="email"
                  className={errors.email && 'is-invalid'}
                  placeholder="Enter email" 
                  value={variablesx.email} 
                  onChange={e => setVariables({...variablesx, email: e.target.value})}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className={errors.username && 'text-danger'}>
                  {errors.username || 'Username' }
                </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Username"
                  className={errors.username && 'is-invalid'}
                  value={variablesx.username} 
                  onChange={e => setVariables({...variablesx, username: e.target.value})}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className={errors.password && 'text-danger'}>
                  {errors.password || 'Password' }
                </Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter Password"
                  className={errors.password && 'is-invalid'}
                  value={variablesx.password} 
                  onChange={e => setVariables({...variablesx, password: e.target.value})}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmPass">
              <Form.Label className={errors.confirmPassword && 'text-danger'}>
                  {errors.confirmPassword || 'Confirm Password' }
                </Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter confirm password"
                  className={errors.email && 'is-invalid'}
                  value={variablesx.confirmPassword} 
                  onChange={e => setVariables({...variablesx, confirmPassword: e.target.value})}/>
              </Form.Group>
  
              <div className="text-center">
                <Button variant="success" type="submit" disabled={loading}>
                  {loading ? 'Loading...': 'Register'}
                </Button>
              </div>
          </Form>
        </Col>
      </Row>
    )
}
