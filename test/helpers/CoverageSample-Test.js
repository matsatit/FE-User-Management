import { expect } from 'chai';
import { getUserInfor } from '../../src/helpers/CoverageSample';

describe('Testing Coverage Sample', () => {

    it('Mr. Namx is a man and an adult', () => {
        const yearOld = 20;
        const userName = "Mr. Namx";

        const outputs = getUserInfor(yearOld, userName);

        expect(outputs).to.include.members([
            "Mr. Namx is a man",
            "Mr. Namx is an adult"
        ]);
    });
});
