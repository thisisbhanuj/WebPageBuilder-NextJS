'use client'

import Image from "next/image";

const convertComponent = (component: any) => {
  const { type, attributes = {}, components = [], content, stylable = [] } = component;

  const children: [] = components.map((child: any) => convertComponent(child));

  switch (type) {
    case 'wrapper':
      return <div key={attributes.id} {...attributes}>{children}</div>;
    case 'text':
      return <div key={attributes.id} {...attributes}>{children}</div>;
    case 'image':
      return <Image key={attributes.id} {...attributes} />;
    case 'textnode':
      return content;
    default:
      return <div key={attributes.id} {...attributes}>{children}</div>;
  }
};

export const convertDataToUI = (data: any) => {
  if (!data?.pages?.[0]?.frames) {
    return null;
  }

  const frame = data.pages[0].frames[0];
  const htmlData = frame.component;

  return convertComponent(htmlData);
};
