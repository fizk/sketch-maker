import * as jsdom from 'jsdom';
import * as assert from 'assert';
import convertImageNode from '../../src/dom-converter/Image';
import {cssStyles} from '../util';

describe('Text', () => {
    it('getClientRects', () => {
        const dom = new jsdom.JSDOM(`<!DOCTYPE html>
            <div>
                <img src="image.jpg" />
            </div>
        `);

        global['document'] = dom.window.document;
        global['getComputedStyle'] = (): any/*CSSStyleDeclaration*/ => {
            return cssStyles;
        };

        const expected = {
            type: 'text',
            nodeName: '#text',
            x: 10,
            y: 10,
            width: 30,
            height: 20,
            text: 'Hello world',
            style: {
                color: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0,
                }
            }
        };
        const actual = convertImageNode(dom.window.document.querySelector("img"));
        assert.deepEqual(actual, expected);

    });
});
