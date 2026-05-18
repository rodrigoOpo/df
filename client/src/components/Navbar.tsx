import { navLinks, navIcons } from '@/constants'
import dayjs from 'dayjs'
import 'dayjs/locale/es';

dayjs.locale('es');

type Props = {}

const Navbar = (props: Props) => {
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
          <time>{dayjs().format("ddd MMM D YYYY H:mm")}</time>
        </div>
    </nav>
  )
}

export default Navbar