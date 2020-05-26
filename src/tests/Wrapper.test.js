import React from 'react';
// Enzyme
import { shallow } from 'enzyme';
// Component
import Wrapper from '../presentational/Wrapper';

it('should render component with grid layout structure', () => {
    expect(shallow(<Wrapper />)).toMatchSnapshot();
});