import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../main_styling/main_styling.scss';

class Confirm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            email: this.props.email,
        }
    }

    render() {
        return (
            <div className="container">
                <div className="registerCard">
                    <p>{this.state.name}, Thank you for registering! See you on the event!</p>
                    <form>
                    <NavLink className="button" to="/home">Back to main page</NavLink>
                    </form>
                </div>
            </div>
        );
    }
}

export default Confirm;