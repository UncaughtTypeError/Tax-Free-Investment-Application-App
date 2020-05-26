import React from 'react';
// Enzyme
import { shallow } from 'enzyme';
// Component
import App from '../App';

it('should render component tree', () => {
    expect(shallow(<App />)).toMatchSnapshot();
});