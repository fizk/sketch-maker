import * as assert from 'assert';
import {radius} from '../../src/util/string';

describe('Radius', () => {
    it('valid', () => {
        const input = '20px';
        const expected = 20;
        const actual = radius(input, 0, 0);
        assert.equal(actual, expected);
    });

    it('invalid', () => {
        const input = 'invalid';
        const expected = 0;
        const actual = radius(input, 0, 0);
        assert.equal(actual, expected);
    });

    it('valid percentage', () => {
        const input = '50%';
        const expected = 100;
        const actual = radius(input, 200, 200);
        assert.equal(actual, expected);
    });
});
