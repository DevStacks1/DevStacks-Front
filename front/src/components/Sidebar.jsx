import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';
import logo3 from 'media/logo3.png'

const SidebarLinks = () => {
  return (
    <ul className='mt-12'>
      <SidebarRoute to='' title='Inicio' icon='fas fa-home' />
      <PrivateComponent roleList={['ADMINISTRATOR']}>
        <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-user-friends' />
      </PrivateComponent>
      <SidebarRoute to='/proyectos' title='Proyectos' icon='fas fa-tasks' />
      <PrivateComponent roleList={['ADMINISTRATOR', 'LEADER']}>
        <SidebarRoute to='/inscripciones' title='Aprobacion Inscripciones' icon='fas fa-scroll' />
      </PrivateComponent>
      <SidebarRoute to='/category1' title='Perfil' icon='fas fa-user' />
      
      <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log('eliminar token');
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebar-route'>
        <div className='flex items-center text-red-600'>
          <i className='fas fa-sign-out-alt' />
          <span className='font-bold text-black text-sm  ml-2'>Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src={logo3} alt='Logo' className='w-40' />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
    {/* Sidebar starts */}

    <div className='sidebar hidden md:flex'>
      <div className='px-8'>
        <Logo />
        <SidebarLinks />
      </div>
    </div>
    <div className='flex md:hidden w-full justify-between bg-black p-2 text-white'>
      <button type='button' onClick={() => setOpen(!open)}>
        <i className={`fas fa-${open ? 'hamburger' : 'bars'}`}/>
      </button>
    </div>
    {open && <ResponsiveSidebar />}
    {/* Sidebar ends */}
  </div>
);
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route border-t-2 border-b-2 font-extrabold border-white text-white'
            : 'sidebar-route font-bold text-gray-900 hover:text-black hover:bg-green-700'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
