import GrapesJsEditor, { AssetsProvider, BlocksProvider, EditorProps, LayersProvider, ModalProvider, SelectorsProvider, StylesProvider, TraitsProvider } from 'nxg-core/src/components';
import { ThemeProvider } from '@mui/material/styles';

import { customTheme, defaultEditorProps } from './common';
import CustomSelectorManager from './CustomSelectorManager';
import CustomStyleManager from './CustomStyleManager';
import CustomTraitManager from './CustomTraitManager';
import CustomLayerManager from './CustomLayerManager';
import CustomBlockManager from './CustomBlockManager';
import CustomAssetManager from './CustomAssetManager';
import CustomModal from './CustomModal';

export default function DefaultCustomEditor(props: Partial<EditorProps>) {
    return (
        <ThemeProvider theme={customTheme}>
            <GrapesJsEditor
                className="gjs-default-custom-editor"
                {...defaultEditorProps}
                {...props}
            >
                <SelectorsProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomSelectorManager {...props}/>
                        </Container>
                    )}
                </SelectorsProvider>
                <StylesProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomStyleManager {...props}/>
                        </Container>
                    )}
                </StylesProvider>
                <TraitsProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomTraitManager {...props}/>
                        </Container>
                    )}
                </TraitsProvider>
                <LayersProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomLayerManager {...props}/>
                        </Container>
                    )}
                </LayersProvider>
                <BlocksProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomBlockManager {...props}/>
                        </Container>
                    )}
                </BlocksProvider>
                <AssetsProvider>
                    {({ assets, select, close, Container }) => (
                        <Container>
                            <CustomAssetManager assets={assets} select={select} close={close}/>
                        </Container>
                    )}
                </AssetsProvider>
                <ModalProvider>
                    {({ open, title, content, close }) => (
                        <CustomModal open={open} title={title} close={close}>
                            {content}
                        </CustomModal>
                    )}
                </ModalProvider>
            </GrapesJsEditor>
        </ThemeProvider>
    )
}