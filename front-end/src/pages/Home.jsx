import React, { Fragment, useEffect, useState } from 'react'
import {Row, Col, Button, Image} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import { useAuthDispatch } from '../context/auth'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_USERS = gql`
    query getUsers {
        getUsers {
            username email createdAt
            latestMessage {
                uuid from to content createdAt
            }
        }
    }
`

const GET_MESSAGES = gql`
    query getMessages($from: String!) {
        getMessages(from: $from) {
            uuid from to content createdAt
        }
    }
`

export default function Home({history}) {
    const dispatch = useAuthDispatch()
    const [selectedUser, setSelectedUser] = useState(null)

   

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history.push('/login')
    }

    const { loading, data, error} = useQuery(GET_USERS)

    const [getMessages, { loading: messagesLoading, data: messagesData}] = useLazyQuery(GET_MESSAGES)

    useEffect(() => {
        if (selectedUser) {
            getMessages({variables: {from: selectedUser}})
        }
    }, [selectedUser])

    if (messagesData) {
        console.log(messagesData.getMessages);
    }

    let userMarkup
    if (!data || loading) {
        userMarkup = <p>Loading...</p>
    } else if (data.getUsers.length === 0) {
        userMarkup = <p>No users have joined yet</p>
    } else if (data.getUsers.length > 0) {
        userMarkup = data.getUsers.map(user => (
            <div className="d-flex p-3" key={user.username} onClick={() => setSelectedUser(user.username)}>
                <Image 
                    src="https://i.stack.imgur.com/l60Hf.png"
                    roundedCircle 
                    style={{width: 50, height: 50, objectFit: 'cover'}}
                    className="mr-2" ></Image>
                <div>
                    <p className="text-success m-0">{user.username}</p>
                    <p className="font-weight-light">
                        {user.latestMessage ? user.latestMessage.content : 'You are now connected!'}
                    </p>
                </div>
            </div>
        ))
    }

    return (
        <Fragment>
            <Row className="bg-white justify-content-around mb-1">
                <Link to="/login">
                    <Button variant="link">Login</Button>
                </Link>
                <Link to="/register">
                    <Button variant="link">Register</Button>
                </Link>
                <Button variant="link" onClick={logout}>Logout</Button>
            </Row>
            <Row className="bg-white ">
                <Col xs={4} className="p-0 bg-light">
                    {userMarkup}
                </Col>
                <Col xs={8}>
                    {messagesData && messagesData.getMessages.length > 0 ? (
                        messagesData.getMessages.map(m => (
                            <p key={m.uuid}>{m.content} </p>
                        ))
                    ): (<p>Messages</p>)}
                </Col>
            </Row>
        </Fragment>
    )
}
