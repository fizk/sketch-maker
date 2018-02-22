import * as jsdom from 'jsdom';
import * as assert from 'assert';
import {cssStyles} from '../util';
import run from '../../src/dom-converter/run';

describe('run', () => {
    it('stuff', () => {
        const dom = new jsdom.JSDOM(`<!DOCTYPE html>
            <div data-sketch>
            <article class="polaroid polaroid--left">
                <header class="polaroid__header">
                    <div class="avatar"></div>
                </header>
                <aside>
                    <div class="user-stats">
                        <h2>John Smith</h2>
                        <h3>Rassgata 240</h3>
                    </div>
                </aside>
            </article>
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

        const structure = run(dom.window.document.querySelector('[data-sketch]'));

        console.log(JSON.stringify(structure, undefined, 4))

        assert.equal(true, typeof structure === 'object' );
    })
});
