import {Base64String, SHA1} from "./sketch";

export type Color = {
    r: number,
    g: number,
    b: number,
    a: number,
}

export type ResourceType = {
    name: SHA1,
    base64: Base64String,
    ext: string,
}

export interface ShapeNodeStyle {
    radius?: number,
    backgroundColor: Color,
    backgroundImage?: {
        name: SHA1,
        naturalWidth: number,
        naturalHeight: number,
        base64: Base64String,
        ext: string,
    },
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

export interface Node {
    type: string,
    nodeName: string,
    x: number,
    y: number,
    width: number,
    height: number,
    classes: string[],
    attributes: {[key: string]: string},
    children?: Node[],
}

export interface GroupNode extends Node {
    name: string,
}

export interface ShapeNode extends Node {
    style: ShapeNodeStyle,
}

export interface ImageNode extends ShapeNode {
    image: {
        name: SHA1,
        naturalWidth: number,
        naturalHeight: number,
        base64: Base64String,
        ext: string,
    }
}

export interface TextNode extends Node {
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
