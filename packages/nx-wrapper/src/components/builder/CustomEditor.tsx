import GrapesJsEditor, { AssetsProvider, Canvas, EditorProps, ModalProvider } from 'nxg-core/src/components';
import { ThemeProvider } from '@mui/material/styles';
import { MAIN_BORDER_COLOR, customTheme, defaultEditorProps } from './common';
import Topbar from './Topbar';
import RightSidebar from './RightSidebar';
import CustomModal from './CustomModal';
import CustomAssetManager from './CustomAssetManager';

export default function CustomEditor(props: Readonly<Partial<EditorProps>>) {
    return (
        <ThemeProvider theme={customTheme}>
            <GrapesJsEditor
                className="gjs-custom-editor"
                {...defaultEditorProps}
                {...props}
            >
                <div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
                    <div className="gjs-column-m flex flex-col flex-grow">
                        <Topbar className="min-h-[48px]"/>
                        <Canvas className="flex-grow gjs-custom-editor-canvas"/>
                    </div>
                    <RightSidebar className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}/>
                </div>
                <ModalProvider>
                    {({ open, title, content, close }) => (
                        <CustomModal open={open} title={title} close={close}>
                            {content}
                        </CustomModal>
                    )}
                </ModalProvider>
                <AssetsProvider>
                    {({ assets, select, close, Container }) => (
                        <Container>
                            <CustomAssetManager assets={assets} select={select} close={close}/>
                        </Container>
                    )}
                </AssetsProvider>
            </GrapesJsEditor>
        </ThemeProvider>
    )
}