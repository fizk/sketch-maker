import {GenericNode} from "../@types/tree";

export default (node: GenericNode): GenericNode => {
    return traverse(node, node.x, node.y);
}

const traverse = (node: GenericNode, offsetX: number, offsetY: number): GenericNode => {
    return Object.assign(
        {},
        node,
        {
            x: node.x - offsetX,
            y: node.y - offsetY,
        },
        node.hasOwnProperty('children') ? {
            children: node.children.map((child: GenericNode) => traverse(child, offsetX, offsetY))
        } : {}
    )
};
