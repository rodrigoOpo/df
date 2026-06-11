"use client"

import useWindowStore from "@/store/Window"
import { WINDOW_CONFIG } from "@/constants";
import { useLayoutEffect, useRef } from "react";
import { ComponentType } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";

gsap.registerPlugin(Draggable);

type WindowKey = keyof typeof WINDOW_CONFIG;
type Props = {}

const WindowWrapper = (Component:ComponentType<any>, windowKey: WindowKey) => {

  const Wrapped = (props: Props) => {
    const { focusWindow, windows } = useWindowStore()
    const { isOpen, zIndex } = windows[windowKey]
    const ref = useRef<HTMLElement | null>(null)


    useGSAP(()=>{
      const el = ref.current;
      if(!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        {scale: 0.8, opacity:0, y:40},
        {scale:1, opacity:1, y:0, duration:0.5, ease:"power3.out"}
      )
    }, [isOpen])

    useGSAP(()=>{
      const el = ref.current;
      if(!el) return;

      const [instance] = Draggable.create(el, { onPress: () => focusWindow(windowKey) })
    
      return () => instance.kill();
    },[])

    
    useLayoutEffect(()=>{
      const el = ref.current;
      if(!el) return;
      el.style.display = isOpen ? "block" : "none";
    },[isOpen])

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props}/>
      </section>
    )
  }

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`

  return Wrapped
}

export default WindowWrapper;