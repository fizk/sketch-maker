import {SketchFile, SketchPage} from "../@types/sketch";
import * as Zip from 'node-zip';

export default ((sketchEntities: SketchFile): Buffer => {
    const zip = new Zip();

    zip.file('document.json', JSON.stringify(sketchEntities.document));
    zip.file('meta.json', JSON.stringify(sketchEntities.meta));
    zip.file('user.json', JSON.stringify(sketchEntities.user));

    sketchEntities.pages.forEach((page: SketchPage) => {
        zip.file(`pages/${page.do_objectID}.json`, JSON.stringify(page));
    });

    sketchEntities.resources.forEach(resource => {
        zip.file(`images/${resource.name}.${resource.ext}`, Buffer.from(resource.base64, 'base64'));
    });

    // zip.file('previews/preview.png', fs.readFileSync('./dist/previews/preview.png'));

    return zip.generate({base64:false,compression:'DEFLATE'});
});
