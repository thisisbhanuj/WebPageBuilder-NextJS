'use client';

import type { Editor, ProjectData } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

import { useCallback, useMemo, useState } from 'react';
import { mdiCheckBold, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { EditorProps } from 'nxg-core/src/components';

import { getDateString } from '@/components/builder/common';
import CustomEditor from '@/components/builder/CustomEditor';
import DefaultEditor from '@/components/builder/DefaultEditor';
import EditorWaitReady from '@/components/builder/EditorWaitReady';
import Link from 'next/link';

enum EditorEnum {
  Custom = 'Custom UI Editor',
  WaitReady = 'Editor wait Ready',
}

function WebPageBuilder() {
  const [editor, setEditor] =  useState<Editor>();
  const [ready, setReady] =  useState<Editor>();
  const [projectData, setProjectData] =  useState<ProjectData>();
  const [projectDataDate, setProjectDataDate] =  useState<Date>();
  const [selectedEditor, setSelectedEditor] =  useState(EditorEnum.Custom);
  const mountedIconCls = `inline-block ${editor ? 'text-green-400' : 'text-red-400'}`;
  const readyIconCls = `inline-block ${ready ? 'text-green-400' : 'text-red-400'}`;

  const onProjectUpdate = useCallback<Required<EditorProps>['onUpdate']>((pd: any) => {
    setProjectData(pd);
    setProjectDataDate(new Date());
    projectData;
  }, []);

  const exampleOptions = useMemo(() => (
    Object.entries(EditorEnum).map(([key, value]) => (
      <option key={key} value={value}>
        {value}
      </option>
    ))
  ), []);

  const onEditorChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEditor(ev.target.value as EditorEnum);
    setEditor(undefined);
    setReady(undefined);
  };

  let EditorToRender = DefaultEditor;

  switch (selectedEditor) {
    case EditorEnum.Custom:
      EditorToRender = CustomEditor;
      break;
    case EditorEnum.WaitReady:
      EditorToRender = EditorWaitReady;
      break;
  }

  (window as any).editor = editor

  return (
    <div className="flex flex-col h-screen text-sm text-white bg-slate-900">
      <div className="flex gap-3 p-3 items-center">
        <div>
          <select
            className="rounded-sm bg-slate-700 p-1"
            value={selectedEditor}
            onChange={onEditorChange}
          >
            {exampleOptions}
          </select>
        </div>
        <div className="flex gap-2 items-center">
            Mounted:
            <Icon
              size={0.7}
              path={editor ? mdiCheckBold : mdiClose}
              className={mountedIconCls}
            />
        </div>
        <div className="flex gap-2 items-center">
            Ready:
            <Icon
              size={0.7}
              path={ready ? mdiCheckBold : mdiClose}
              className={readyIconCls}
            />
        </div>
        <div className="flex gap-2 items-center">
            <Link href="/converter">
              Convert
            </Link>
        </div>
        {
          !!projectDataDate &&
          <div>Last update: {getDateString(projectDataDate)}</div>
        }
      </div>
      <div className="flex-grow overflow-hidden">
        <EditorToRender className='editor-container'
          onEditor={setEditor}
          onReady={setReady}
          onUpdate={onProjectUpdate}
        />
      </div>
    </div>
  )
}

export default WebPageBuilder
