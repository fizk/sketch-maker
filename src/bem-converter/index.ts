import {GenericNode, GroupNode, NonTerminal} from "../@types/tree";

const traverse = (data: GenericNode): GenericNode => {

    if (data.hasOwnProperty('children')) {
        const node: NonTerminal = <NonTerminal>data;
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
                classes: node.classes
            };

            node.children = node.children.map(traverse);

            groupNode.children = [node];

            return groupNode;
        } else {
            node.children = node.children.map(traverse);
            return <GenericNode> node;
        }
    }

    return data;
};

export default traverse;
