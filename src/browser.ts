import * as puppeteer from 'puppeteer';
import * as devices  from 'puppeteer/DeviceDescriptors';
import {GenericNode} from "./@types/tree";

export default async (url: string, selector: string): Promise<GenericNode[]> => {
    const browser = await puppeteer.launch({
        args: ['--disable-web-security']
    });
    const page = await browser.newPage();
    // await page.emulate(devices['iPhone X']);
    await page.goto(url);
    await page.addScriptTag({
        path: './lib/dom-converter/bundle.js'
    });

    const components = await page.evaluate(async (selector) => {
        return await Promise.all(Array.from(document.querySelectorAll(selector)).map(run));
    }, selector);

    await browser.close();

    return components;
};
