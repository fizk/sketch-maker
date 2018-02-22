import * as jsdom from 'jsdom';
import * as assert from 'assert';
import convertTextNode from '../../src/dom-converter/Text';
import {cssStyles} from '../util';

describe('Text', () => {
    it('getClientRects', () => {
        const dom = new jsdom.JSDOM(`<!DOCTYPE html>
            <div>
                <p>Hello world</p>
            </div>
        `);
        dom.window.document.documentElement.scrollTop = 0;
        dom.window.document.documentElement.scrollLeft = 0;
        dom.window.document.createRange = () => {
            return {
                setEnd: () => {},
                setStart: () => {},
                getBoundingClientRect: () => {
                    return { right: 0 };
                },
                getClientRects: () => [{
                    top: 10,
                    left: 10,
                    width: 10,
                    height: 10
                },{
                    top: 20,
                    left: 10,
                    width: 30,
                    height: 10
                }],
            };
        };

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
        const actual = convertTextNode(dom.window.document.querySelector("p").firstChild);
        assert.deepEqual(actual, expected);

    });
});
