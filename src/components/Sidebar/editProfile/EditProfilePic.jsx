import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { connect } from "react-redux";
import { userAction } from '../../../redux/actions';
import "./editProfilePic.css"

const mapDispatchToProps = (dispatch) => ({
	userActionProps:(d) => dispatch(userAction(d))
});

function EditProfilePic(props) {
    const [show, setShow] = useState(false);
    const [userImg, setUserImg] = useState({image:null})
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const profileImage = async (e) => {
        try {
            const formData = new FormData()
            formData.set('avatar', userImg.image)
            e.preventDefault()
            const imgresponse = await fetch(`${process.env.REACT_APP_BACKEND}/users/me/cover`,{
                credentials:'include',
                method: 'POST',
                body: formData
            })
            const data = await imgresponse.json()
            if(imgresponse.ok){
                props.userActionProps(data)
                setUserImg({})                       
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  
    return (
      <>
        <img 
        onClick={handleShow}
        className={"m-1"} 
        alt='avatar' 
        src={props.user.avatar}  />
  
        <Modal id="profileModal" show={show} onHide={handleClose} animation={false}>
          <Modal.Header id="modal-heading"  closeButton>
            <Modal.Title><span style={{color: "#E9F200", fontSize:"larger"}}>{props.user.name}'s</span> Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
                <img 
                onClick={handleShow}
                className="m-1 modalProfilePic img-fluid" 
                alt='avatar' 
                src={props.user.avatar}  />
          </Modal.Body>
          <Modal.Footer className="d-flex px-4 pt-0 flex-row justify-content-between">
            <div className="d-flex text-center">
                <Button variant="secondary" className="text-center d-flex flex-column pr-5">
                <div className="hoverBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                    <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                    </svg>
                </div>
                <div>
                    Edit
                </div>
                </Button>

                <Button className=" d-flex flex-column pr-5 mx-5" variant="secondary">
                    <div className="hoverBtn">
                    <label className="p-0 d-flex mt-0 mr-0 mb-0 mx-3" htmlFor ="postimg">
                                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                        <path d="M16 13a4 4 0 11-4-4 4 4 0 014 4zm6-4v11H2V9a3 3 0 013-3h1.3l1.2-3h9l1.2 3H19a3 3 0 013 3zm-5 4a5 5 0 10-5 5 5 5 0 005-5z"></path>
                        </svg>
                                            
                    </label>
                    <input 
                        style={{display:'none'}}
                        type="file"
                        title="choose"
                        id="postimg"
                        onChange={(e) => {
                            setUserImg({
                                image: (e && e.target) && e.target.files[0]
                            })
                            console.log(e.target.files[0])
                            }}                            
                        />

                    </div>
                    <div>
                        Upload
                    </div>
                </Button>

                <Button onClick={(e) => 
                    profileImage(e)} 
                    variant="secondary" className="d-flex flex-column pr-5">
                <div className="hoverBtn mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match ml-4" width="24" height="24" focusable="false">
                    <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                    </svg>
                </div>
                <div>
                    Save changes
                </div>
                </Button>
                </div>
                                    
                <div className="d-flex text-center">
                <Button variant="secondary" className="text-center d-flex flex-column">
                    <div className="hoverBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match ml-2" width="24" height="24" focusable="false">
                        <path d="M20 4v1H4V4a1 1 0 011-1h4a1 1 0 011-1h4a1 1 0 011 1h4a1 1 0 011 1zM5 6h14v13a3 3 0 01-3 3H8a3 3 0 01-3-3zm9 12h1V8h-1zm-5 0h1V8H9z"></path>
                        </svg>
                    </div>
                    <div>
                        Delete
                    </div>
                    </Button>
                    </div>                                    
            </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default connect(s => s, mapDispatchToProps)(EditProfilePic)