import {
  FaRunning,
  FaUserAlt,
} from 'react-icons/fa';
import { SiGoogledocs } from 'react-icons/si';
import { TbChartAreaLineFilled } from 'react-icons/tb';
import { GiNotebook } from 'react-icons/gi';
import { FaSackDollar } from 'react-icons/fa6';
import { getUserFromLocalStorage } from './localStorage';

const user = getUserFromLocalStorage();

let links
// user.role == 'admin'
if (false) {
  links = [
    {
      id: 1,
      text: 'Perfil',
      path: '/editActivity',
      icon: FaUserAlt,
    },
    {
      id: 2,
      text: 'Atividades',
      path: '/',
      icon: FaRunning,
    },
    {
      id: 3,
      text: 'Registrar usuário',
      path: '/',
      icon: FaRunning,
    },
  ];
} else {
  links = [
    {
      id: 1,
      text: 'Perfil',
      path: '/editActivity',
      icon: FaUserAlt,
    },
    {
      id: 2,
      text: 'Atividades',
      path: '/',
      icon: FaRunning,
    },
  ];
}
export { links };
