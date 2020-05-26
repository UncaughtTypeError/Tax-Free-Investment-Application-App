import React from 'react';
// Enzyme
import { shallow } from 'enzyme';
// Component
import Header from '../presentational/Header';

it('should render component', () => {
    expect(shallow(<Header />)).toMatchSnapshot();
});