"use client"

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
  subtitle: {min:100, max:400, default:100},
  title: {min:400, max:900, default:400}
}

type fontweightKey = keyof typeof FONT_WEIGHTS;

type Props = {}

const renderText = (text:string , classname:string , baseWeigth: number=400) => {
  return [...text].map((char, i)=>(
    <span
    key={i}
    className={classname}
    style={{ fontVariationSettings: `'wght' ${baseWeigth}` }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ))
}

const setupTextHover = (container:HTMLElement | null, type: fontweightKey) => {
  if(!container) return () => {};

  const letters = container.querySelectorAll<HTMLElement>("span");
  const { min, max, default: base } = FONT_WEIGHTS[type]

  const animateLetter = (letter:HTMLElement, weight:number, duration: number=0.25) => {
    return gsap.to(letter, {
      duration,
      ease:'power2.out',
      fontVariationSettings: `'wght' ${weight}`
    })
  }

  const handleMouseMove = (e:MouseEvent) => {
    const { left } = container.getBoundingClientRect()
    const mouseX = e.clientX - left;

    letters.forEach((letter:any) => {
      const {left: l, width: w} = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetter(letter, min + (max - min)* intensity)
  });
  }
  const handleMouseLeave = () => letters.forEach((letter) => animateLetter(letter, base, 0.3))

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  }
}

const Welcome = (props: Props) => {

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const titleCleanUp = setupTextHover(titleRef.current, 'title');
    const subtitleCleanUp = setupTextHover(subtitleRef.current, 'subtitle');

    return () => {
      subtitleCleanUp?.();
      titleCleanUp?.();
    }
  }, [])

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hola, soy Rodrigo! Bienvenido a mi",
          "text-3xl font-georama",
          100,
          )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText(
          "portafolio",
          "text-9xl italic font-georama"
        )}
      </h1>

      <div className="small-screen">Esta web esta diseñada unicamente para ordenador/tablet </div>
    </section>
  )
}

export default Welcome;