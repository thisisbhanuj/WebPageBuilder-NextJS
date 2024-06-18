import GrapesJsEditor, { EditorProps } from 'gjs-next-wrapper/src/components';
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