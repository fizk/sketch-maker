# Sketch Maker

SketchMaker is a collection of functions that in one way or another contribute to making a 
[Sketch43](http://sketchplugins.com/d/87-new-file-format-in-sketch-43) file.

## The in-between file format
 If you have a look at the `./sketch-converter/index.ts` you will find a function that takes in some data
 in the type of `GenericNode` and will return you a `SketchLayer[]`. Now the later is a Sketch specific data type
 but the other is not.
 
 This whole library is written with HTML in mind, that is; convert a HTML file into a Sketch file. But it should
 not be limited to that. You might well have a CSV file that you want to convert to a Sketch pie chart. It is therefor
 good to have some common ground... 
 
 Have a look at `./@types/tree.ts` ti understand this in-between format, it is pretty simple.
 
 
## Create from a HTML file
Let's start from the source and work our way towards the Sketch file. First up is a HTML file.

To be able to inspect a HTML, it needs to be running it on an HTTP server. Have a look at `./browser.ts`. That is a simple
function that takes in an URL and a CSS selector and will return you a Promise resolving to an array of elements
in the _in-between format_.

If you want the whole HTML as one element you would provide a CSS selector like `body`. A smarter way would be to wrap
all elements you want in a `<div data-sketch>...</div` and have multiple elements in the page. The function call would
then look something like this

```typescript
import {GenericNode} from './@types/tree';
import getDataFromBrowser from './browser';

getDataFromBrowser('http://localhost:9090', '[data-sketch]')
    .then((components: GenericNode[]) => {
        console.log(components);
    });
```

This could return you something like this

```json
[
    {
        "type": "shape",
        "nodeName": "DIV",
        "x": 8,
        "y": 8,
        "width": 784,
        "height": 528.71875,
        "style": {
            "radius": 0,
            "backgroundColor": {
                "r": 0,
                "g": 0,
                "b": 0,
                "a": 0
            }
        },
        "classes": [],
        "children": [
            {
                "type": "shape",
                "nodeName": "ARTICLE",
                "x": 8,
                "y": 8,
                "width": 784,
                "height": 528.71875,
                "style": {
                    "radius": 0,
                    "backgroundColor": {
                        "r": 0,
                        "g": 0,
                        "b": 0,
                        "a": 0
                    },
                    "boxShadow": [
                        {
                            "color": {
                                "r": 0,
                                "g": 0,
                                "b": 0,
                                "a": 0.3
                            },
                            "blurRadius": 5,
                            "offsetX": 0,
                            "offsetY": 2,
                            "spread": 0
                        }
                    ]
                },
                "classes": [
                    "polaroid",
                    "polaroid--left"
                ],
                "children": []
            }
        ]
    },
    {
        "type": "shape",
        "nodeName": "DIV",
        "x": 8,
        "y": 536.71875,
        "width": 784,
        "height": 374.71875,
        "style": {
            "radius": 0,
            "backgroundColor": {
                "r": 0,
                "g": 0,
                "b": 0,
                "a": 0
            }
        },
        "classes": [],
        "children": []
    }
]
```
One thing to node is that evey element will have its XY coordinates base off of the same grid system, that is; a child
x and y values are not based on the parent.

What you do with this document, is up to you, it can be converted into a Sketch file as is, but you might want to do
additional work on it...

## Group related elements.
Sketch does'nt group similar element by default. All element will be attached to the _Page_  directly.
If you wanna work with the file you created in Sketch, it can become annoying as you will have a long list of
 shapes on the left hand side with cryptic names. You can do some post-formatting on the  _in-between format_ 
 file before converting it to *.sketch.
 
### BEM grouper.
In the `./bem-converter` folder is a _converter_ function that takes in a `GenericNode` and return a `GenericNode`.
This function will recursively go through the children of this _node_ and if it finds a _node_ that it thinks is a **BLOCK**
element in the **BLOCK ELEMENT MODIFIER** naming convention, it will wrap that _node_ in a `GroupNode`, which
then will be converted into a `SketchGroup` when converted into a *.sketch file.

### Other groupers.
This lib only comes with the **BEM converter**. If you want to group by something else, you have to write your own.
You might want to group on another CSS naming convention. Maybe you wanna use the `<section />`, `<header />`, `<article />`
landmark elements... or something completely different.


```typescript
import {GenericNode} from './@types/tree';
import getDataFromBrowser from './browser';
import bemConverter from './bem-converter';

getDataFromBrowser('http://localhost:9090', '[data-sketch]')    
    .then((components: GenericNode[]) => {
        return components.map(bemConverter);
    })
    .then((components: GenericNode[]) => {
        console.log(components);
    })
```

This is how it could look like.

## Hoist everything up to {0,0}
The components that you are extracting from the HTML page could be located where ever on it. Maybe you are creating a Symbols
library out of your component and you want therefor them to begin at {x: 0, y:0}.

For that there is a function under `./dom-coverter/hoist.ts` that will take one component and set its XY to zero and pull
all the children accordingly. 

```typescript
import {GenericNode, ResourceType} from './@types/tree';
import getDataFromBrowser from './browser';
import hoist from './dom-converter/hoist';

getDataFromBrowser('http://localhost:9090/examples/crawl-browser', '[data-sketch]')
    .then((components: GenericNode[]) => {

        //HOIST: Hoist the root component up to {0, 0}
        //  and for every child to follow that.
        return components.map(hoist);
    })
    .then(console.log)
    .catch(console.error);
```

## Get the resources.
HTML not only contains text, it will also contain binary data like images. When the `dom-converter` encounters something that resolves 
to binary data, like a `<img />` tag, it will extract the data into a **Base64** string and attach it to that node. For example:
the `Image` node looks like this:

```typescript
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
```

Sketch on the other hand, does'nt contain the binary data in the node directly, it will store the actual file in a folder and then
reference it in the node via SHA1 reference.

The `./resource/extractor` contains a function that can go through the _in-between format_ and extract all the resources out of it.

In the example below, I'm going through an array of components, so I need to flatten the array coming out.

```typescript
import {GenericNode, ResourceType} from './@types/tree';
import bemConverter from './bem-converter';
import getDataFromBrowser from './browser';
import findResources from './resources-extractor';

getDataFromBrowser('http://localhost:9090/examples/crawl-browser', '[data-sketch]')

    .then((components: GenericNode[]) => {
        return components.map(bemConverter);
    })
    .then((components: GenericNode[]) => {

        //Extract all the resources into an array.
        const resources: ResourceType[] = components.map((child: GenericNode) => findResources(child))
            .reduce((previous: ResourceType[], current: ResourceType[]) =>[...previous, ...current], []);
        return [components, resources]
    })
    .then(console.log)
    .catch(console.error);
```
## I want my Sketch components
No we can finally start to convert our _in-between format_ data in to **Sketch** data. We have all kinds of options here.
But first let's explore that it takes to create a valid **Sketch** file. The file needs to be a _zipped_ folder with this
structure

```
|
+ -- user.json
|
+ -- meta.json
|
+ -- document.json
|
+ -- images
|  |
|  + -- <hash>.png
|  |
|  ` -- <hash>.png
|
+ --pages
|  |
|  + -- <uuid>.json
|  |
|  ` -- <uuid>.json
|
`previews
   |
   ` -- preview.png
```
So all these files need to be generated.

### One big page
Lets start simple and just take the whole HTML page and for each component found, convert it into a corresponding
Sketch Page.

The main part here is the `./sketch-converter/index.ts` file that exports a function that takes in a `GenericNode` from
our _in-between format_ and returns an array of `SketchLayer` objects, which is the most generic object of the
Sketch file format, a `SketchLayer` can be a:
```typescript
export type SketchLayer =
    | SketchText
    | SketchShapeGroup
    | SketchShapePath
    | SketchBitmap
    | SketchSymbolInstance
    | SketchGroup
    | SketchRectangle
    | SketchOval
```
From that we can create our pages.
```typescript
const sketchComponents: SketchLayer[][] = components.map((component: GenericNode) => sketchConverter(component));
const pages = sketchComponents.map((page, i) => createPage(page, `Page ${i}`));
```

...so this is taking `components` which is an array of `GenericNode` objects and converting it into an array of an array
of `SketchLayer` objects and then for each of these arrays, converting them into Sketch Pages.

Next, we need to extract information from these pages, to create the _meta_, _user_ and _document_ objects.

```typescript
const document = createSketchDocument(pages);
const meta = createMetaDocument(pages);
const user = createUserDocument([document], pages);
```
This is just extracting the important bits from the pages, like their UUID ans such to be able to like everything together.

Lastly, we can put all these objects together into onw and pass it on.

The whole code looks something like this: (I left out the hoisting and BEM stuff to emphasise the important bits)
```typescript
import {
    createMetaDocument,
    createPage,
    createSketchDocument,
    createUserDocument
} from './sketch-converter/creators';
import {GenericNode, ResourceType} from './@types/tree';
import {SketchFile, SketchLayer, SketchPage} from './@types/sketch';
import sketchConverter from './sketch-converter';
import getDataFromBrowser from './browser';
import findResources from './resources-extractor';

getDataFromBrowser('http://localhost:9090', '[data-sketch]')
    .then((components: GenericNode[]) => {
        const resources: ResourceType[] = components.map((child: GenericNode) => findResources(child))
            .reduce((previous: ResourceType[], current: ResourceType[]) =>[...previous, ...current], []);
        return [components, resources]
    })
    .then(([components, resources]: [GenericNode[], ResourceType[]]) => {

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
    }).catch(console.error)
```

### Symbols library
What I often like to do is to create a Sketch file that one empty Page and then all my components as symbols in a
symbols library. To do that lets first take a look at the HTML document.

The HTML is structured like this:
```html
<div data-sketch="component/one">
    <div class="block">...component one...</div>
</div>
<div data-sketch="component/two">
    <div class="block">...component two...</div>
</div>
```
To put it in plain english: I have a wrapper for each component that provides a name for the component (through the `data-sketch`
attribute) and an entry point (also through the `data-sketch` attribute). Then I expect the wrapper to only has one child
which is the component itself.

So after I've converted the whole page into an array of `GenericNode`s, for each of those nodes I will get the name of the
component (via the `<div data-sketch="component/one">` bit), and from the first child of that node (that would be 
the `<div class="block">...component one...</div>` bit) I will convert into a `SketchLayer` object. What comes back 
will be wrapped in a `SketchSymbolMaster` object via the `createSketchSymbolMaster()` function, which need a name (`data-sketch` bit),
a width and a height (which comes from the `<div class="block">` bit) and the shape (which is the `SketchLayer` bit).

This will give me an array of `SketchSymbolMaster` which will become my first page. I then just create an empty page so that the
person using the Sketch file has something to draw on.

The rest is pretty much the same as in the example above. The _meta_, _user_ and _document_ are derived from these pages
and the everything is mashed up into one object and returned.

Lets see how that looks like in code:

```typescript
import {
    createMetaDocument,
    createPage,
    createSketchDocument, 
    createSketchSymbolMaster,
    createUserDocument
} from './sketch-converter/creators';
import {GenericNode, ResourceType} from './@types/tree';
import {SketchFile, SketchLayer, SketchPage, SketchSymbolMaster} from './@types/sketch';
import sketchConverter from './sketch-converter';
import getDataFromBrowser from './browser';
import findResources from './resources-extractor';

getDataFromBrowser('http://localhost:9090', '[data-sketch]')
    .then((components: GenericNode[]) => {
        const resources: ResourceType[] = components.map((child: GenericNode) => findResources(child))
            .reduce((previous: ResourceType[], current: ResourceType[]) =>[...previous, ...current], []);
        return [components, resources]
    })
    .then(([components, resources]: [GenericNode[], ResourceType[]]) => {

        const symbols: SketchSymbolMaster[] = components.map((node: GenericNode) => {
            if (node.hasOwnProperty('children') && node.children.length > 0) {
                const shapes: SketchLayer[] = sketchConverter(<GenericNode>node.children[0]);
                return createSketchSymbolMaster(
                    node.attributes['data-sketch'],
                    (<GenericNode>node).children[0].width,
                    (<GenericNode>node).children[0].height,
                    shapes
                );
            } else {
                return createSketchSymbolMaster(
                    node.attributes['data-sketch'],
                    (<GenericNode>node).children[0].width,
                    (<GenericNode>node).children[0].height,
                    []
                )
            }
        });

        const symbolsPage: SketchPage = createPage(symbols, 'Symbols');
        const mainPage: SketchPage = createPage([], 'Page 1');

        const document = createSketchDocument([mainPage, symbolsPage]);
        const meta = createMetaDocument([mainPage, symbolsPage]);
        const user = createUserDocument([document], [mainPage, symbolsPage]);

        return {
            resources,
            pages: [mainPage, symbolsPage],
            document,
            meta,
            user
        };
    }).catch(console.error)
``` 
 
### Other ways.
Keeping everything separate like this means that you can write and construct your own rules and work-flows. If you can't
wrap each component into a marker (like I did with `<div data-sketch />`) but have some other way of defining your
components, you should be able use the functions provided... so go crazy... find your own way.  

## Save the file
Provide is a handy little function under `./zip/converter` that takes in a `SketchFile` type and returns you a GZIP buffer
that you can save to disk via the `fs` functions.

```typescript
import * as fs from 'fs';
import getDataFromBrowser from './browser';
import {GenericNode, ResourceType} from './@types/tree';
import zip from './zip-converter';
import {SketchFile} from './@types/sketch';

getDataFromBrowser('http://localhost:9090/examples/crawl-browser', '[data-sketch]')
    .then((components: GenericNode[]) => {
        //... do everything needed and return a SketchFile
        return data: SketchFile = {...}
    })
    .then((sketchEntities: SketchFile) => {
        const buffer: Buffer = zip(sketchEntities);
        fs.writeFileSync('./test2.sketch', buffer, 'binary');
    })
    .catch(console.error);
```

## Security 
When getting the _in-between format_ from the browser, under the hood, [puppeteer](https://github.com/GoogleChrome/puppeteer)
calls Chromium.  When images are converted into a Base64 string, they are loaded into a `<canvas />` element, but as 
a security contraint, only same-domain images can be loaded that way. Your images may come from an image-server in which
case they would not be on the same domain as the rest of the page. For this to still work, Chromium is started with the 
`--disable-web-security`.
