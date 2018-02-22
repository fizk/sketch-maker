import * as assert from 'assert';
import {boxShadow} from '../../src/util/string';

describe('Box Shadow', () => {
    it('full input', () => {
        const input = 'rgba(0, 0, 0, 0) 0px 2px 5px 10px';
        const expected = [{
            color: {
                r: 0, g: 0, b: 0, a: 0
            },
            blurRadius: 5,
            offsetX: 0,
            offsetY: 2,
            spread: 10
        }];
        const actual = boxShadow(input);
        assert.deepEqual(actual, expected);
    });

    it('part input', () => {
        const input = 'rgb(0, 0, 0) 0px 2px 5px';
        const expected = [{
            color: {
                r: 0, g: 0, b: 0, a: 1
            },
            blurRadius: 5,
            offsetX: 0,
            offsetY: 2,
            spread: 0
        }];
        const actual = boxShadow(input);
        assert.deepEqual(actual, expected);
    });

    it('none input', () => {
        const input = 'none';
        const expected = null;
        const actual = boxShadow(input);
        assert.deepEqual(actual, expected);
    });
});
