import React from 'react';
// Enzyme
import { shallow } from 'enzyme';
// Component
import WrapperErrorBoundary from '../error-boundaries/WrapperErrorBoundary';

it('should render fallback content', () => {
    expect(shallow(<WrapperErrorBoundary>
        {() => { throw new Error(); }}
    </WrapperErrorBoundary>)).toMatchSnapshot();
});