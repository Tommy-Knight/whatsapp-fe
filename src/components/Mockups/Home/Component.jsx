import './style.css'
import {Col, Container, Row} from "react-bootstrap";
import Sidebar from "../Sidebar/Component";

const Chats = null

const Home = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col md={3}>
                        <aside>
                            <Sidebar/>
                        </aside>
                    </Col>
                    <Col md={9}>
                        <main>

                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home