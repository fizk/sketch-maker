import {
    createMetaDocument,
    createPage,
    createSketchDocument, createSketchSymbolMaster,
    createUserDocument
} from './sketch-converter/creators';
import * as fs from 'fs';
import {GenericNode, ResourceType} from './@types/tree';
import {SketchFile, SketchLayer, SketchPage, SketchSymbolMaster} from './@types/sketch';
import sketchConverter from './sketch-converter';
import bemConverter from './bem-converter';
import getDataFromBrowser from './browser';
import hoist from './dom-converter/hoist';
import zip from './zip-converter';
import findResources from './resources-extractor';

getDataFromBrowser('http://www.visir.is/', 'body')
// getDataFromBrowser('http://localhost:9090/examples/crawl-browser', '[data-sketch]')
// getDataFromBrowser('http://localhost:9001/iframe.html?selectedKind=SalesStats&selectedStory=Many%20property%20types%20and%20suburbs%2C%20agent%20with%20specified%20experience&full=0&addons=1&stories=1&panelRight=1&addonPanel=REACT_STORYBOOK%2Freadme%2Fpanel', 'section.sales-stats-container')
// getDataFromBrowser('http://localhost:9001/iframe.html?selectedKind=Listings&selectedStory=Standard%20Profile%20Listings%20Cell&full=0&addons=1&stories=1&panelRight=1&addonPanel=REACT_STORYBOOK%2Freadme%2Fpanel', '.frame > div')
    .then((components: GenericNode[]) => {
        console.log(`Extracted ${components.length} components from server`);
        return components
    })
    // .then((components: GenericNode[]) => {
    //     console.log(`Grouping by BEM namings`);
    //
    //     // GROUP: group by BEM naming convention.
    //     return components.map(bemConverter);
    // })
    .then((components: GenericNode[]) => {
        console.log(`Hoisting every component up to {0, 0}`);

        //HOIST: Hoist the root component up to {0, 0}
        //  and for every child to follow that.
        return components.map(hoist);
    })
    .then((components: GenericNode[]) => {
        console.log(`Extracting resources`);

        //EXTRACT: extract all resources into their own array
        //  return and array of array of GenericNode types and array
        //  of ResourceType types.
        const resources: ResourceType[] = components.map((child: GenericNode) => findResources(child))
            .reduce((previous: ResourceType[], current: ResourceType[]) =>[...previous, ...current], []);
        return [components, resources]
    })
    .then(([components, resources]: [GenericNode[], ResourceType[]]) => {

        // - - - - [Symbols document and an empty page] - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // console.log('Extracting symbols');
        //
        // const symbols: SketchSymbolMaster[] = components.map((node: GenericNode) => {
        //     if (node.hasOwnProperty('children') && node.children.length > 0) {
        //         const shapes: SketchLayer[] = sketchConverter(<GenericNode>node.children[0]);
        //         return createSketchSymbolMaster(
        //             node.attributes['data-sketch'],
        //             (<GenericNode>node).children[0].width,
        //             (<GenericNode>node).children[0].height,
        //             shapes
        //         );
        //     } else {
        //         return createSketchSymbolMaster(
        //             node.attributes['data-sketch'],
        //             (<GenericNode>node).children[0].width,
        //             (<GenericNode>node).children[0].height,
        //             []
        //         )
        //     }
        // });
        //
        // const symbolsPage: SketchPage = createPage(symbols, 'Symbols');
        // const mainPage: SketchPage = createPage([], 'Page 1');
        //
        // const document = createSketchDocument([mainPage, symbolsPage]);
        // const meta = createMetaDocument([mainPage, symbolsPage]);
        // const user = createUserDocument([document], [mainPage, symbolsPage]);
        //
        // return {
        //     resources,
        //     pages: [mainPage, symbolsPage],
        //     document,
        //     meta,
        //     user
        // };


        // - - - - [One component per Page] - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        console.log('Extracting components into pages');

        const sketchComponents: SketchLayer[][] = components.map((component: GenericNode) => sketchConverter(component));
        const pages = sketchComponents.map((page, i) => createPage(page, `Page ${i}`));

        const document = createSketchDocument(pages);
        const meta = createMetaDocument(pages);
        const user = createUserDocument([document], pages);

        return {
            resources,
            pages,
            document,
            meta,
            user
        }
    })
    .then((sketchEntities: SketchFile) => {
        const buffer: Buffer = zip(sketchEntities);
        fs.writeFileSync('/Users/einar.adalsteinsson/Desktop//test2.sketch', buffer, 'binary');
    })
    .catch(console.error);
