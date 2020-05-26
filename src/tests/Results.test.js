import React from 'react';
// Enzyme
import { shallow } from 'enzyme';
// Component
import Results from '../presentational/Results';

it('should render component', () => {
    expect(shallow(<Results />)).toMatchSnapshot();
});