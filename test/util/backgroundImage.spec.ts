import * as assert from 'assert';
import {backgroundImage} from '../../src/util/string';

describe('backgroundImage', () => {
    it('return url', () => {
        const input = 'url("http://localhost:9090/examples/crawl-browser/D661E09EEA497B979C3205C5661A8A84962B6DC047A8ECD18A0F0541D7FB3772_227x150.jpg")';
        const expected = 'http://localhost:9090/examples/crawl-browser/D661E09EEA497B979C3205C5661A8A84962B6DC047A8ECD18A0F0541D7FB3772_227x150.jpg';
        const actual = backgroundImage(input);
        assert.equal(actual, expected);
    })
});
