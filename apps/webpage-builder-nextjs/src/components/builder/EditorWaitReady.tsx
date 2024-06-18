import GrapesJsEditor, { EditorProps } from 'gjs-next-wrapper/src/components';
import { defaultEditorProps, slowStoragePlugin } from './common';
import FullSpinner from './FullSpinner';

const options = {
  ...defaultEditorProps.options,
  storageManager: { type: 'slow' }
};

const plugins = [
  slowStoragePlugin,
  ...defaultEditorProps.plugins!,
];

export default function EditorWaitReady(props: Partial<EditorProps>) {
    return (
        <GrapesJsEditor
          className="gjs-editor-wait-ready"
          {...defaultEditorProps}
          options={options}
          plugins={plugins}
          {...props}
          waitReady={<FullSpinner/>}
        />
    )
}