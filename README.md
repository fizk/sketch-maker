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







