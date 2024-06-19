import dynamic from 'next/dynamic';

const WebPageBuilder = dynamic(() => import('@/components/builder/WebPageBuilder'), { ssr: false });

export default function Builder() {
  return <WebPageBuilder />;
}