import './style.css'
import React, {MouseEvent} from "react";

import {RouteComponentProps} from "react-router-dom";
import {Container, Row, Col, Button} from "react-bootstrap";

export const Landing: React.FunctionComponent<RouteComponentProps> = ({history}) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) =>
        e.currentTarget.name === "login" ? history.push("/login") : history.push("/register");
    return (
        <Container fluid={true}>
            <main id={'landingView'}>
                <Row>
                    <Col md={6}>
                        <Row className={'d-flex flex-row justify-content-center'}>

                            <div style={{width: 'max-content'}}
                                 className={'d-flex flex-column justify-content-center'}>
                                <h1 > WriteAndTap </h1>
                                <h3> Because speaking is noisy <br/>-Gamze, your introverted friend </h3>
                            </div>
                            <div className={'d-flex flex-row justify-content-center'}>
                                <Button
                                    className={'m-5'}
                                    onClick={handleClick} name='login'>
                                    Login
                                </Button>
                                <Button
                                    className={'m-5'}
                                    onClick={handleClick} name='register'>
                                    Register
                                </Button>
                            </div>
                        </Row>
                    </Col>
                    <Col md={6} id={'landingIllustration'} style={{
                        backgroundImage: 'url( assets/img/Chat.svg )'
                    }}>

                    </Col>
                </Row>
            </main>
        </Container>
    );
};
