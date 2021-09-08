import './style.css'
import {Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

const UserPreview = () => {
    const [isSingleUser, setIsSingleUser] = useState(null);
    useEffect(() => {
        setIsSingleUser(true)
    },[]);


    return (
        <section id={'userPreview'}>
            <Row>
                <Col md={3}>
                    <div className={'d-flex justify-content-center'}>
                        {isSingleUser ?
                            <img id={'userChatPic'}
                                 src="https://via.placeholder.com/100"
                                 alt={'userChatPic'}/> :
                            <img id={'groupChatPic'}
                                 src={'/'}
                                 alt={'groupChatPic'}/>
                        }
                    </div>
                </Col>
                <Col md={9}>
                    {isSingleUser ?
                        <h1 id={'userNickname'}> user nickname</h1>
                        : <h1 id={'groupName'}/>
                    }
                </Col>
            </Row>
        </section>
    )
}

export default UserPreview