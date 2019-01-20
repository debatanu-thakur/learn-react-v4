import React from 'react';
import {create} from 'react-test-renderer';
import Details from '../Details';

test('Snapshot for Details', () => {
    const c = create(<Details />)

    expect(c.toJSON()).toMatchSnapshot();
})
