"use client"

import { navLinks } from '@/constants'
import dayjs from 'dayjs'
import 'dayjs/locale/es';
import { useState, useEffect } from 'react';
import useWindowStore from '@/store/Window';


dayjs.locale('es');

type Props = {}

const Navbar = (props: Props) => {

  const [time, setTime] = useState(dayjs());
  const { openWindow } = useWindowStore()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 60_000); // cada minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className='font-bold'>Archivador online UwU</p>

            <ul>
              {navLinks.map(({id, name, type})=>(
                <li key={id} onClick={()=> openWindow(type)}>
                  <p>{name}</p>
                </li>
              ))}
            </ul>
        </div>


        <div>
          <time>{time.format("ddd MMM D YYYY H:mm")}</time>
        </div>
    </nav>
  )
}

export default Navbar