import "quill/dist/quill.snow.css";
import "./style.css"
import {useQuill} from "react-quilljs";
import {useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";

const MessageEditor = ({ sendMessageFunction  }) => {
    const {quill, quillRef} = useQuill();
    const [message, setMessage] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log( 'in MessageEditor component message is ', message)
        sendMessageFunction( message )
    };

    const updateMessageContent = () => {
        if (quill) {
            quill.on('text-change', () => {
                const htmlMessage = quill.root.innerHTML
                setMessage(htmlMessage)
            });
        }
    }

    useEffect(() => {
        updateMessageContent()
    }, [quill]);

    return (
        <form id={'messageEditor'}
            onSubmit={onSubmitHandler}>
            <Row>
                <Col md={10}>
                    <div className={'editor-wrapper '}>
                        <div ref={quillRef}/>
                    </div>
                </Col>
                <Col md={2} className={'d-flex flex-column align-items-center justify-content-center p-3'}>
                    <Button type='submit'>send</Button>
                </Col>
            </Row>
        </form>
    )
}

export default MessageEditor