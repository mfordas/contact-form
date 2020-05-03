import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../main_styling/main_styling.scss';
import { restartForm } from '../../actions/formActions';

class Confirm extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="registerCard">
                    <p>{this.props.name}, Thank you for registering! See you on the event!</p>
                    <form>
                        <NavLink className="button" onClick={() => this.props.restartForm()} to="/home">Back to main page</NavLink>
                    </form>
                </div>
            </div>
        );
    }
}

Confirm.propTypes = {
    restartForm: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    confirm: state.form.confirm
  });

export default connect(mapStateToProps, { restartForm })(Confirm);