import React from 'react';
// Enzyme
import { shallow } from 'enzyme';
// Component
import Form from '../containers/Form';

it('should render component', () => {
    expect(shallow(<Form />)).toMatchSnapshot();
});