import hoist from "../../src/dom-converter/hoist";
import * as assert from "assert";
import {GenericNode} from "../../src/@types/tree";

describe('Hoist', () => {
    it('hoist three levels down', () => {
        const input = {
            classes: ['block__element', 'block--modifier'],
            children: [
                {
                    classes: ['block', 'block--modifier'],
                    children: [
                        {
                            classes: ['block', 'block--modifier'],
                            children: [],
                            nodeName: 'BLOCK',
                            x: 30,
                            y: 30,
                            width: 0,
                            height: 0,
                            attributes: {key: 'value'},
                            name: '',
                            type: '',
                        },
                        {
                            classes: ['block', 'block--modifier'],
                            children: [],
                            nodeName: 'BLOCK',
                            x: 30,
                            y: 30,
                            width: 0,
                            height: 0,
                            attributes: {key: 'value'},
                            name: '',
                            type: '',
                        }
                    ],
                    nodeName: 'BLOCK',
                    x: 20,
                    y: 20,
                    width: 0,
                    height: 0,
                    attributes: {key: 'value'},
                    name: '',
                    type: '',
                },
            ],
            nodeName: 'ELEMENT',
            x: 10,
            y: 10,
            width: 0,
            height: 0,
            attributes: {key: 'value'},
            name: '',
            type: '',

        };

        const expected = {
            classes: ['block__element', 'block--modifier'],
            children: [
                {
                    classes: ['block', 'block--modifier'],
                    children: [
                        {
                            classes: ['block', 'block--modifier'],
                            children: [],
                            nodeName: 'BLOCK',
                            x: 20,
                            y: 20,
                            width: 0,
                            height: 0,
                            attributes: {key: 'value'},
                            name: '',
                            type: '',
                        },
                        {
                            classes: ['block', 'block--modifier'],
                            children: [],
                            nodeName: 'BLOCK',
                            x: 20,
                            y: 20,
                            width: 0,
                            height: 0,
                            attributes: {key: 'value'},
                            name: '',
                            type: '',
                        }
                    ],
                    nodeName: 'BLOCK',
                    x: 10,
                    y: 10,
                    width: 0,
                    height: 0,
                    attributes: {key: 'value'},
                    name: '',
                    type: '',
                },
            ],
            nodeName: 'ELEMENT',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            attributes: {key: 'value'},
            name: '',
            type: '',
        };

        const actual = hoist(<GenericNode> input);

        assert.deepEqual(actual, expected);
    });
});
