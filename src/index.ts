import {
    createMetaDocument,
    createPage,
    createSketchDocument,
    createUserDocument
} from './sketch-converter/creators';
import * as fs from 'fs';
import {GenericNode, ImageNode, NonTerminal} from './@types/tree';
import {Base64String, SHA1, SketchLayer, SketchPage} from './@types/sketch';
import sketchConverter from './sketch-converter';
import bemConverter from './bem-converter';
import getDataFromBrowser from './browser';
import * as Zip from 'node-zip';

getDataFromBrowser('http://localhost:9090/examples/crawl-browser', '[data-sketch]')
    .then((components: GenericNode[]) => {
        return components.map(bemConverter);
    })
    .then((components: GenericNode[]) => {



        const resources: {name: SHA1, base64: Base64String, ext: string}[] = [];

        const findResources = (data: GenericNode) => {
            if(data.type === 'image') {
                resources.push({
                    name: (<ImageNode> data).image.name,
                    base64: (<ImageNode> data).image.base64,
                    ext: (<ImageNode> data).image.ext,
                })
            }

            if (data.hasOwnProperty('children')) {
                (<NonTerminal> data).children.forEach(findResources);
            }
        };
        components.map(findResources);




        const sketchComponents: SketchLayer[][] = components.map((component: GenericNode) => sketchConverter(component));

        const pages = sketchComponents.map((page, i) => createPage(page, i));

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
    .then(everything => {

        const zip = new Zip();

        zip.file('document.json', JSON.stringify(everything.document));
        zip.file('meta.json', JSON.stringify(everything.meta));
        zip.file('user.json', JSON.stringify(everything.user));

        everything.pages.forEach((page: SketchPage) => {
            zip.file(`pages/${page.do_objectID}.json`, JSON.stringify(page));
        });

        everything.resources.forEach(resource => {
            zip.file(`images/${resource.name}.${resource.ext}`, Buffer.from(resource.base64, 'base64'));
        });

        // zip.file('previews/preview.png', fs.readFileSync('./dist/previews/preview.png'));

        const data = zip.generate({base64:false,compression:'DEFLATE'});
        fs.writeFileSync('./test2.sketch', data, 'binary');


    })


    .catch(console.error);
