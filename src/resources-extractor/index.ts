import {GenericNode, ImageNode, ResourceType, ShapeNode} from "../@types/tree";


const findResources = (node: GenericNode, resources: ResourceType[] = []): ResourceType[] => {
    if(node.type === 'image') {
        resources.push({
            name: (<ImageNode> node).image.name,
            base64: (<ImageNode> node).image.base64,
            ext: (<ImageNode> node).image.ext,
        });
    }

    if ((<ShapeNode>node).style && (<ShapeNode>node).style.backgroundImage) {
        resources.push({
            name: (<ShapeNode> node).style.backgroundImage.name,
            base64: (<ShapeNode> node).style.backgroundImage.base64,
            ext: (<ShapeNode> node).style.backgroundImage.ext,
        });
    }

    if (node.hasOwnProperty('children')) {
        node.children.forEach(child => findResources(<GenericNode>child, resources));
    }

    return resources;
};

export default findResources;
