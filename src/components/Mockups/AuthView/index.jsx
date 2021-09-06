import './style.css'
import {useState} from "react";
import {Button, Form} from "react-bootstrap";


const AuthView = () => {
    let [isRegister, setIsRegister] = useState(false)
    return (
        <section id={'authView'}>
            <div id={'authFormWrapper'} className={'d-flex justify-content-center'}>

                {isRegister ?
                    <a onClick={ setIsRegister(false) }> Sign In </a> :
                    <a onClick={ setIsRegister(true) } > Sign Up </a>
                }
                <Form>
                    <Form.Group className="mb-2" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formRepeatPassword">
                        <Form.Label>repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formRemember">
                        <Form.Check type="checkbox" label="Remember me"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </section>
    )
}

export default AuthView