import React from 'react';
// Enzyme
import { shallow } from 'enzyme';
// Component
import Body from '../containers/Body';

it('should render component', () => {
    expect(shallow(<Body />)).toMatchSnapshot();
});