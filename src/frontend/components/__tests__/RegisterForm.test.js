import React from 'react';
import ReactDOM from 'react-dom';
import RegisterFormContent from '../RegisterForm';
import RegisterForm from '../RegisterForm/registerForm';
import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterFormContent />, div);
});

it('Empty from gives invalid data true', () => {
  const wrapper = mount(<RegisterForm />);
  wrapper.find('button').simulate('click');
  expect(wrapper.state('invalidData')).toBe(true);
});