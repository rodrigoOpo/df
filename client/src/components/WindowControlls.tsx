import useWindowStore from "@/store/Window"

type Props = {
    target: any
}

const WindowControlls = ({target}: Props) => {

    const {closeWindow} = useWindowStore();


  return (
    <div id="window-controls">
        <div className="close" onClick={() => closeWindow(target)}/>
        <div className="minimize"/>
        <div className="maximize"/>
    </div>
  )
}

export default WindowControlls