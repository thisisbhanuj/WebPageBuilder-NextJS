import { EditorProps } from 'gjs-next-wrapper/src/components';
import type grapesjs from 'grapesjs';
import type { Plugin, EditorConfig } from 'grapesjs';
import { createTheme } from '@mui/material/styles';

declare global {
    interface Window {
        grapesjs: typeof grapesjs
    }
}

export const MAIN_BG_COLOR = 'bg-slate-900';

export const MAIN_TXT_COLOR = 'text-white';

export const BTN_CLS = 'border rounded px-2 py-1 w-full';

export const MAIN_BORDER_COLOR = 'border-slate-500';

export const ROUND_BORDER_COLOR = `rounded border ${MAIN_BORDER_COLOR}`;

export function cx(...inputs: any[]): string {
    const inp = Array.isArray(inputs[0]) ? inputs[0] : [...inputs];
    return inp.filter(Boolean).join(' ');
}

export const getDateString = (date?: Date) => {
    return date?.toISOString().replace(/Z|T/gi, ' ');
}

export const plugins: EditorProps['plugins'] = [
    {
        id: 'gjs-blocks-basic',
        src: 'https://unpkg.com/grapesjs-blocks-basic',
    },
    'grapesjs-plugin-forms',
    'grapesjs-component-countdown',
];

export const defaultOptions: EditorConfig = {
    storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
        options: {
            local: {
                key: 'gjsProject',
            },
            storeComponents: true,
            storeStyles: true,
            storeHtml: true,
            storeCss: true,
        }
    },
    assetManager: {
        assets: [
          'https://via.placeholder.com/350x250/78c5d6/fff',
        ],
    },
    undoManager: {
        trackSelection: false,
    },
    selectorManager: {
        componentFirst: true,
    },
    components: `
        <div style="padding: 25px">Element A</div>
        <div class="example example-a">Element B</div>
        <div style="padding: 20px">
            <div class="example-b1">Element B1</div>
            <div class="example-b2">Element B2</div>
            <div>Element B3</div>
        </div>
        <div>Element C</div>
    `,
};

export const slowStoragePlugin: Plugin = (editor) => {
    editor.Storage.add('slow', {
      async load() {
        console.log('Waiting for the Storage');
        await new Promise(res => setTimeout(res, 3000));
        return {
          pages: [{ component: '<h1>Content from the Storage</h1>'}],
        };
      },
      async store() {},
    })
  }

export const defaultEditorProps: EditorProps = {
    grapesjs: window.grapesjs,
    grapesjsCss: 'https://unpkg.com/grapesjs/dist/css/grapes.min.css',
    plugins: plugins,
    options: defaultOptions,
}

export const customTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});