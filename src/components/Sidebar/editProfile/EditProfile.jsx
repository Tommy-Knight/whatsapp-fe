import { Component} from 'react';
import { Link } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';
import './editProfile.css';
import { connect } from 'react-redux';
import { userAction } from '../../../redux/actions';

const mapDispatchToProps = (dispatch) => ({
	userActionProps:(d) => dispatch(userAction(d))
});

const {REACT_APP_BACKEND} = process.env;
class EditProfile extends Component {
  state = {
    edit: {
      name: this.props.user?.name,
      surname: this.props.user?.surname,
      email: this.props.user?.email,
      status: this.props.user?.status,
      username: this.props.user?.username,
      about: this.props.user?.about
    },
  };

  handleChange = (e) => {
    let id = e.currentTarget.id;
    this.setState({ edit:{
        ...this.state.edit,
        [id]: e.target.value
    } });
  };

  editInfo = async () => {
    const url = `${REACT_APP_BACKEND}/users/me`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        credentials: "include",
        body: JSON.stringify(this.state.edit),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const editedInfo = await response.json();
      
      console.log("response",response.ok);
      if (response.ok) {
        this.props.userActionProps(editedInfo)
        alert('edit done');
        this.setState({
          edit:{
            name: this.props.edit.name,
            surname: this.props.edit.surname,
            email: this.props.edit.email,
            status: this.props.edit.status,
            username: this.props.edit.username,
            about:this.props.edit.naaboutme
          }
        });
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Form>
        <Form.Group className='d-flex'>
          <Col>
            <Form.Label className='text-muted'>First Name *</Form.Label>
            <Form.Control
              onChange={(e) => this.handleChange(e)}
              value={this.state.edit.name}
              id='name'
              className='name'
              type='text'
            />
          </Col>

          <Col>
            <Form.Label className='text-muted'>Last Name *</Form.Label>
            <Form.Control
              onChange={(e) => this.handleChange(e)}
              value={this.state.edit.surname}
              id='surname'
              className='surname'
              type='text'
            />
          </Col>
        </Form.Group>

        <Col>
          <Form.Group className='my-4'>
            <Form.Label className='text-muted'>Email *</Form.Label>
            <Form.Control
              onChange={(e) => this.handleChange(e)}
              value={this.state.edit.email}
              id='email'
              className='surname'
              type='email'
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label className='text-muted'>Username</Form.Label>
            <Form.Control
              onChange={(e) => this.handleChange(e)}
              value={this.state.edit.username}
              id='username'
              className='surname'
              type='text'
            />
          </Form.Group>
        </Col> 

        <Col>
          <Form.Group>
            <Form.Label className='text-muted mt-4'>Status *</Form.Label>
            <Form.Control
              onChange={(e) => this.handleChange(e)}
              value={this.state.edit.status}
              id='status'
              className='name'
              type='text'
            />
          </Form.Group>
        </Col>

        <div className='text-right mt-5'>
          <Button
            className='badge-pill savebtn'
            onClick={(e) => this.editInfo(e)}
            variant='primary'
          >
            <strong>Save</strong>
          </Button>
        </div>
      </Form>
    );
  }
}

export default connect((s) => s,mapDispatchToProps)(EditProfile);