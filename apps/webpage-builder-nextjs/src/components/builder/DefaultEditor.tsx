import GrapesJsEditor, { EditorProps } from 'grapesjs-nextjs/src/components';
import { defaultEditorProps } from './common';

export default function DefaultEditor(props: Partial<EditorProps>) {
    return (
        <GrapesJsEditor
          className="gjs-default-editor"
          {...defaultEditorProps}
          {...props}
        />
    )
}