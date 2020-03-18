import React from 'react';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import '../../main_styling/main_styling.scss';
import Confirm from './confirm';
import ErrorMessage from '../ReusableComponents/ErrorMessage';

class RegisterForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      lastName: '',
      email: '',
      eventDate: '',
      confirm: false,
      errors: ''
    }
  }

  postGuest = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/api/guests',
        data: {
          name: this.state.name,
          lastName: this.state.lastName,
          email: this.state.email,
          eventDate: this.state.date
        },
        headers: setHeaders()
      });

      if (res.status === 200) {
        this.setState({ confirm: true });
      } else {
        this.setState({ invalidData: true });

      }
    }
    catch (error) {
      this.setState({ errors: error.response.data.details });
      console.error('Error Registration:', error.response);
      this.setState({ invalidData: true });
    }
  }


  onButtonSubmit = async e => {
    e.preventDefault();
    console.log(this.state);
    this.postGuest();
  }

  errorHandler = data => {
    return <ErrorMessage message={`${data}`} />
  }

  messageHandler = errorsType => {
  return this.state.errors.forEach(error => error.path[0] === errorsType ? error.message : null);
  }

  render() {
    return (
      <div className="container">
        {this.state.confirm === false ? <div className="registerCard">
          <p>Welcome in contact form for our super misterious event! Type your name, last name, e-mail and date and keep your fingers crossed that we will use it in proper way!</p>
          <form>
            <input onChange={e => this.setState({ name: e.target.value })}></input>
            {this.state.invalidData && this.state.errors ? <ErrorMessage message={`${this.messageHandler("name")}`} /> : null}
            <p>Name</p>
            <input onChange={e => this.setState({ lastName: e.target.value })}></input>
            {this.state.invalidData && this.state.errors ? <ErrorMessage message={`${this.messageHandler("lastName")}`} /> : null}
            <p>Last name</p>
            <input onChange={e => this.setState({ email: e.target.value })}></input>
            {this.state.invalidData && this.state.errors ? <ErrorMessage message={`${this.messageHandler("email")}`} /> : null}
            <p>E-mail</p>
            <input onChange={e => this.setState({ date: e.target.value })}></input>
            {this.state.invalidData && this.state.errors ? <ErrorMessage message={`${this.messageHandler("eventDate")}`} /> : null}
            <p>Date</p>
            <button className="button" onClick={this.onButtonSubmit}>Register</button>
          </form>
        </div> : <Confirm name={this.state.name} email={this.state.email} />}
      </div>
    );
  }
}

export default RegisterForm;