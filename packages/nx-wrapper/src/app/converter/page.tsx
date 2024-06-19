import dynamic from "next/dynamic";

const NextJSRenderer = dynamic(() => import('@/components/renderer/Renderer'), { ssr: false });

const Converter = () => {
  return (
    <div className="render-container">
        <NextJSRenderer />
    </div>
  )
}

export default Converter