import './style.css'

import React, { useState } from "react";

import {RouteComponentProps} from "react-router-dom";

//TODO errors toasts framework
//TODO User Not found, wrong password, server error
export const Login: React.FunctionComponent<RouteComponentProps> = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const bodyJSON = JSON.stringify({
        email: email,
        password: password,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const resp = await fetch(`${process.env.REACT_APP_BACKEND}/auth/login`, {
							method: "POST",
							credentials: "include",
							headers: {
								"Content-Type": "application/json",
							},
							body: bodyJSON,
						});
            const data = await resp.json();
            if (resp.ok) {
                history.push("/home");
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section id={'loginView'} className={'authForm'}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="card shadow m-3">
                            <div className="card-title text-center border-bottom">
                                <h2 className="p-3">Login</h2>
                            </div>
                            <div className="card-body">
                                <form
                                    onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="email"
                                               onChange={e => setEmail(e.target.value)}/>

                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password"
                                               onChange={e => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="mb-4">
                                        <input type="checkbox" className="form-check-input" id="remember"/>
                                        <label htmlFor="remember" className="form-label">Remember Me</label>
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn text-light main-bg"
                                                >
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/*

login
<input
type='text'
placeholder='email'
onChange={(e) => {
    setEmail(e.target.value);
}}/>
<input
    type='text'
    placeholder='password'
    onChange={(e) => {
        setPassword(e.target.value);
    }}/>
<button onClick={handleSubmit}> Submit</button>

 */
