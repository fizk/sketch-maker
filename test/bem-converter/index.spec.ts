import traverse from '../../src/bem-converter';
import * as assert from 'assert';
import {GenericNode} from "../../src/@types/tree";

describe('traverse', () => {
    it('root is block', () => {
        const input = {
            classes: ['block', 'block--modifier'],
            children: [],
            nodeName: 'DIV',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        const expected = {
            type: 'group',
            name: 'block block--modifier',
            nodeName: 'DIV',
            children: [{
                classes: ['block', 'block--modifier'],
                children: [],
                nodeName: 'DIV',
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            }],
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            classes: ['block', 'block--modifier'],
        };
        const actual = traverse(<GenericNode> input);

        assert.deepEqual(actual, expected);
    });

    it('first child of root is block, second is not', () => {
        const input = {
            classes: ['block__element', 'block--modifier'],
            children: [
                {
                    classes: ['block', 'block--modifier'],
                    children: [],
                    nodeName: 'BLOCK',
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                },
                {
                    classes: ['block--modifier'],
                    nodeName: 'MODIFIER',
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                }
            ],
            nodeName: 'ELEMENT',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        const expected = {
            classes: ['block__element', 'block--modifier'],
            children: [
                {
                    type: 'group',
                    name: 'block block--modifier',
                    nodeName: 'BLOCK',
                    children: [{
                        classes: ['block', 'block--modifier'],
                        children: [],
                        nodeName: 'BLOCK',
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }],
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    classes: ['block', 'block--modifier'],
                }, {
                    classes: ['block--modifier'],
                    nodeName: 'MODIFIER',
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                }
            ],
            nodeName: 'ELEMENT',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        const actual = traverse(<GenericNode> input);

        assert.deepEqual(actual, expected);
    });

    it('root is not block, has no children', () => {
        const input = {
            classes: ['block__element'],
            children: [],
            nodeName: 'DIV',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        const expected = {
            classes: ['block__element'],
            children: [],
            nodeName: 'DIV',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        const actual = traverse(<GenericNode> input);

        assert.deepEqual(actual, expected);
    });

    it('root is not block, has terminal children', () => {
        const input = {
            classes: ['block__element'],
            children: [{
                classes: ['block__element'],
                nodeName: 'TERMINAL',
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            }],
            nodeName: 'DIV',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        const expected = {
            classes: ['block__element'],
            children: [{
                classes: ['block__element'],
                nodeName: 'TERMINAL',
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            }],
            nodeName: 'DIV',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        const actual = traverse(<GenericNode> input);

        assert.deepEqual(actual, expected);
    });
});
