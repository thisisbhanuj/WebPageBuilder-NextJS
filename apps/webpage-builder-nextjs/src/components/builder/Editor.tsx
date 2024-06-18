import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
        // Indicate where to init the editor. You can also pass an HTMLElement
        container: editorRef.current ?? '#gjs',
        // Get the content for the canvas directly from the element
        // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
        fromElement: true,
        height: '70vh',
        width: 'auto',
        storageManager: false,
        panels: { defaults: [] },
        blockManager: {
        appendTo: '#gjs-blocks',
        blocks: [
            {
                id: 'section',
                label: '<b>Section</b>',  // You can use HTML/SVG inside labels
                attributes: { class:'gjs-block-section' },
                content: `<section>
                    <h1>This is a simple title</h1>
                    <p>And this is just a Lorem text: Lorem ipsum dolor sit amet</p>
                </section>`,
            },
            {
                id: 'image',
                label: 'Image',
                // Select the component once it's dropped
                select: true,
                // You can pass components as a JSON instead of a simple HTML string,
                // in this case we also use a defined component type `image`
                content: { type: 'image' },
                // This triggers `active` event on dropped components and the `image`
                // reacts by opening the AssetManager
                activate: true,
            },
            {
                id: 'text1',
                label: 'Text',
                content: '<div data-gjs-type="text">Insert your text here</div>',
            },
            {
                id: 'text2',
                label: 'Text',
                content: '<div data-gjs-type="text">Insert your text here</div>',
            },
        ]
        }
    });

    // Cleanup on unmount
    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <>
      <div id="gjs-blocks"></div>
      <div id="gjs" ref={editorRef} className='gjs-container'></div>
    </>
  );
};

export default Editor;
