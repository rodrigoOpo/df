"use client"

import { navLinks, navIcons } from '@/constants'
import dayjs from 'dayjs'
import 'dayjs/locale/es';
import { useState, useEffect } from 'react';


dayjs.locale('es');

type Props = {}

const Navbar = (props: Props) => {

  const [time, setTime] = useState(dayjs());

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
              {navLinks.map(({id, name})=>(
                <li key={id}>
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