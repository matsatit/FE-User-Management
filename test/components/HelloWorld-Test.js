const expect = require('chai').expect;

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
});
