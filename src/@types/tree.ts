import {Base64String, SHA1} from "./sketch";

export type Color = {
    r: number,
    g: number,
    b: number,
    a: number,
}

export interface ShapeNodeStyle {
    radius?: number,
    backgroundColor: Color,
    border?: {
        color: Color,
        thickness: number
    }[],
    boxShadow?: {
        color: Color,
        blurRadius: number,
        offsetX: number,
        offsetY: number,
        spread: number,
    }[]
}

export interface Terminal extends Node {
}

export interface NonTerminal extends Node  {
    children: Node[],
}

export interface Node {
    type: string,
    nodeName: string,
    x: number,
    y: number,
    width: number,
    height: number,
    classes: string[],
}

export interface GroupNode extends NonTerminal {
    name: string,
}

export interface ShapeNode extends NonTerminal {
    style: ShapeNodeStyle,
}

export interface ImageNode extends Terminal {
    style: ShapeNodeStyle,
    image: {
        name: SHA1,
        naturalWidth: number,
        naturalHeight: number,
        base64: Base64String,
        ext: string,
    }
}

export interface TextNode extends Terminal {
    text: string,
    style: {
        color: Color
    },
}

export type GenericNode =
    | ShapeNode
    | ImageNode
    | TextNode
    | GroupNode;
