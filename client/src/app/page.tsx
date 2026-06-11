import { Navbar, Welcome, Dock } from '@/components/index'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

import Terminal from '@/windows/index';

gsap.registerPlugin(Draggable)

export default function Home() {
  return (
    <>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
    </>
  );
}
