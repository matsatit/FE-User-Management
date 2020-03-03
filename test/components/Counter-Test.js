import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { expect } from 'chai';
import Counter from '../../src/components/Counter';

describe('Testing Counter component', () => {

    it('Can run only this case on Browsers', () => {
        let container = document.createElement('div');
        document.body.appendChild(container);

        // Test first render and componentDidMount
        act(() => {
            ReactDOM.render(<Counter />, container);
        });
        const button = container.querySelector('button');
        const label = container.querySelector('p');
        expect(label.textContent).equal('You clicked 0 times');
        expect(document.title).equal('You clicked 0 times');
    
        // Test second render and componentDidUpdate
        act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(label.textContent).equal('You clicked 1 times');
        expect(document.title).equal('You clicked 1 times');
    });

    it('Can run this case anywhere', () => {
        let somevalue = 10;
        expect(somevalue).equal(10);
    });
});
