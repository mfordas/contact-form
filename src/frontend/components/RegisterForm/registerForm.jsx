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

  handleChange = date => {
    this.setState({
      eventDate: new Date(date)
    });
  };

  nameValidate = () => {
    let message;
    if ((this.state.name.length < 3 || this.state.name.length > 26 ) && this.props.invalidData) {
      message = 'Name should have between 3 and 26 characters';
      return message;
    }
    else { return '' }
  };

  lastnameValidate = () => {
    let message;
    if ((this.state.lastName.length < 3 || this.state.lastName.length > 26 ) && this.props.invalidData) {
      message = 'Last name should have between 3 and 26 characters';
      return message;
    }
    else { return '' }
  };

  emailValidate = () => {
    let message;
    if ((this.state.email.length < 5 || this.state.email.includes('@')===false || this.state.email.includes('.')===false) && this.props.invalidData) {
      message = 'Type e-mail in proper format: id@domain';
      return message;
    }
    else { return '' }
  };

  dateValidate = () => {
    let message;
    if (this.state.eventDate === '' && this.props.invalidData) {
      message = 'Type date in proper format: dd/mm/yyyy';
      return message;
    }
    else { return '' }
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
            {this.props.invalidData && this.props.errors ? <ErrorMessage message={`${this.nameValidate()}`} /> : null}
            <p>Last name</p>
            <input onChange={e => this.setState({ lastName: e.target.value })} value={lastName}></input>
            {this.props.invalidData && this.props.errors ? <ErrorMessage message={`${this.lastnameValidate()}`} /> : null}
            <p>E-mail</p>
            <input onChange={e => this.setState({ email: e.target.value })} value={email}></input>
            {this.props.invalidData && this.props.errors ? <ErrorMessage message={`${this.emailValidate()}`} /> : null}
            <p>Date</p>
            <DatePicker utcOffset={0} dateFormat="dd/MM/yyyy" selected={this.state.eventDate} onChange={this.handleChange} value={eventDate} />
            {this.props.invalidData && this.props.errors ? <ErrorMessage message={`${this.dateValidate()}`} /> : null}
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