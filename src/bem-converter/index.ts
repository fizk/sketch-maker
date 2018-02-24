import {GenericNode, GroupNode} from "../@types/tree";

const traverse = (node: GenericNode): GenericNode => {

    if (node.hasOwnProperty('children')) {
        const isBlock: boolean = node.classes.length > 0 && node.classes.some((item: string) => (
            item.match(/^([a-z0-9]*)([-_][a-z]*)?$/) !== null
        ));

        if(isBlock) {
            const groupNode: GroupNode = {
                type: 'group',
                name: (node.classes || []).join(' '),
                nodeName: node.nodeName,
                children: [],
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                classes: node.classes,
                attributes: {}
            };

            node.children = node.children.map(traverse);

            groupNode.children = [node];

            return groupNode;
        } else {
            node.children = node.children.map(traverse);
            return <GenericNode> node;
        }
    }

    return node;
};

export default traverse;
