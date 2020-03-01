import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { act } from 'react-dom/test-utils';

import HelloWorld from '../../src/components/helloworld/HelloWorld';

describe('Hello World!', () => {
    
    it('Hey, I am a Browser based case', () => {
        let element = document.createElement('div');
        element.innerText = 'Hello World';
        expect(element.outerHTML).equal('<div>Hello World</div>');
    });

    it('Hey, I can run anywhere', () => {
        let somevalue = 10;
        expect(somevalue).equal(10);
    });

    it('Able to render the component', () => {
        let element = document.createElement('div');
        act(() => {
            ReactDOM.render(<HelloWorld />, element);
        });
        const renderedStr = element.querySelector('div').textContent;
        expect(renderedStr).to.equal('Hello World!');
    });
});
