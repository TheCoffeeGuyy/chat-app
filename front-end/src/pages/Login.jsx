import React, { useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'

import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const LOGIN_USER = gql`
  query login($username: String! $password: String!) {
    login(username: $username password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

export default function Login(props) {
    const [variablesx, setVariables] = useState({
        username: '',
        password: '',
      })

      const [errors, setErrors] = useState({})
    
      const [loginUser, { data, loading, error }] = useLazyQuery(LOGIN_USER, {
          onError(error) {
            console.log('onError',error.graphQLErrors[0])
            setErrors(error.graphQLErrors[0].extensions.errors)
          },
          onCompleted (data) {
            localStorage.setItem('token', data.login.token)
            props.history.push('/')
          }
      });
      const submitLoginForm = async (e) => {
        e.preventDefault()
        loginUser({variables: variablesx})
        console.log(variablesx)
      }
    return (
        <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
            <h1 className="text-center">Login</h1>
            <Form onSubmit={submitLoginForm}>
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
  
              <div className="text-center">
                <Button variant="success" type="submit" disabled={loading}>
                  {loading ? 'Loading...': 'Login'}
                </Button>
                <small>Don't have an account ? <Link to="/register">Register</Link></small>
              </div>
          </Form>
        </Col>
      </Row>
    )
}