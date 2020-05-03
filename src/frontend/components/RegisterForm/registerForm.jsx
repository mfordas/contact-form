import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../main_styling/main_styling.scss';
import Confirm from './confirm';
import ErrorMessage from '../ReusableComponents/ErrorMessage';
import DatePicker from "react-datepicker";
import { postGuest } from '../../actions/formActions';

import "react-datepicker/dist/react-datepicker.css";

class RegisterForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      lastName: '',
      email: '',
      eventDate: ''
    }
  }

  onButtonSubmit = async e => {
    e.preventDefault();
    const guest = {
        name: this.state.name,
        lastName: this.state.lastName,
        email: this.state.email,
        eventDate: this.state.eventDate 
    }
    await this.props.postGuest(guest);
  }

  messageHandler = errorsType => {
    let message;
    this.props.errors.forEach(error => error.path[0] === errorsType ? message = error.message : null);
    if (message) { return message } else { return '' }
  };

  handleChange = date => {
    this.setState({
      eventDate: new Date(date)
    });
  };

  render() {
    const {
      name,
      lastName,
      email,
      eventDate
    } = this.state

    return (
      <div className="container">
        {this.props.confirm === false ? <div className="registerCard">
          <p>Welcome in contact form for our super misterious event! Type your name, last name, e-mail and date and keep your fingers crossed that we will use it in proper way!</p>
          <form>
            <p>Name</p>
            <input onChange={e => this.setState({ name: e.target.value })} value={name}></input>
            {this.props.invalidData && this.props.errors ? <ErrorMessage message={`${this.messageHandler("name")}`} /> : null}
            <p>Last name</p>
            <input onChange={e => this.setState({ lastName: e.target.value })} value={lastName}></input>
            {this.props.invalidData && this.props.errors ? <ErrorMessage message={`${this.messageHandler("lastName")}`} /> : null}
            <p>E-mail</p>
            <input onChange={e => this.setState({ email: e.target.value })} value={email}></input>
            {this.props.invalidData && this.props.errors ? <ErrorMessage message={`${this.messageHandler("email")}`} /> : null}
            <p>Date</p>
            <DatePicker utcOffset={0} dateFormat="dd/MM/yyyy" selected={this.state.eventDate} onChange={this.handleChange} value={eventDate} />
            {this.props.invalidData && this.props.errors ? <ErrorMessage message={`${this.messageHandler("eventDate")}`} /> : null}
            <button className="button" onClick={this.onButtonSubmit}>Register</button>
          </form>
        </div> : <Confirm name={this.state.name} />}
      </div>
    );
  }
}

RegisterForm.propTypes = {
  postGuest: PropTypes.func.isRequired,
  confirm: PropTypes.bool,
  invalidData: PropTypes.bool,
  errors: PropTypes.array
};

const mapStateToProps = state => ({
  confirm: state.form.confirm,
  invalidData: state.form.invalidData,
  errors: state.form.errors
});

export default connect(mapStateToProps, { postGuest })(RegisterForm);