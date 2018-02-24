import {GenericNode, ImageNode, ResourceType} from "../@types/tree";


const findResources = (node: GenericNode, resources: ResourceType[] = []): ResourceType[] => {
    if(node.type === 'image') {
        resources.push({
            name: (<ImageNode> node).image.name,
            base64: (<ImageNode> node).image.base64,
            ext: (<ImageNode> node).image.ext,
        })
    }

    if (node.hasOwnProperty('children')) {
        node.children.forEach(child => findResources(<GenericNode>child, resources));
    }

    return resources;
};

export default findResources;
