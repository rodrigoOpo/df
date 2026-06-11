import { Navbar, Welcome, Dock } from '@/components/index'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import  Windows  from '@/windows/index';

gsap.registerPlugin(Draggable)

const Terminal = Windows.Terminal;
const Safari = Windows.Safari;
const Resume = Windows.Resume;

export default function Home() {
  return (
    <>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
      <Safari/>
      <Resume/>
    </>
  );
}
