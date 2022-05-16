import React from 'react'
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import axios from 'axios';

const ip = 'http://'+ process.env.REACT_APP_URL_API+ ':5000';

const Home = (props) => {

    let navigate = useNavigate();

    const [user, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {

      e.preventDefault();
      const ipBuilder = ip + '/api/login';
      const usuario = await axios.post(ipBuilder, {
        user: user,
        password: password
      })

      const usuarioEnvio = {

        user: usuario.data.user,
        email: usuario.data.email,
        nombre: usuario.data.nombre,
        hospital: usuario.data.hospital,

      }

      if(usuario.data != null) {

        if(usuario.data.rol === 'admin'){

          console.log('entro');
          props.setstatemt(usuarioEnvio);
          return navigate('/admin/Estudiantes')

        }

        if(usuario.data.rol === 'doctor'){
          const route = 'doctor/estudiantes/';
          props.setstatemt(usuarioEnvio);
          return navigate(route)

        }

        
      }else{
        console.log('efe');
      }

    }


    return (
      <div className="container-fluid py-5 pd-5 rounded rounded-3">
        <div className="login-card shadow bg-body container-fluid bg-light rounded-3 border border-3 pb-5">

          <h1 className="display-5 text-center">Facultad de Medicina</h1>

          <div className="rounded-3 text-dark pb-4">
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Logo_de_la_Universidad_El_Bosque.svg/1200px-Logo_de_la_Universidad_El_Bosque.svg.png'
              className='mx-auto d-block w-75 h-75' alt='' />

          </div>
          <hr />
          <h1 className='text-center pb-4'>Iniciar Sesion</h1>
          <form className='form-floating text-center' onSubmit={handleSubmit}>

            <div className='form-floating mb-3'>

              <input className='form-control' type='text' id='user' placeholder='Nombre de Usuario' onChange={(e) => setUsuario(e.target.value)}></input>
              <label htmlFor='user'>Nombre de Usuario</label>

            </div>

            <div className='form-floating mb-3'>

                
              <input className='form-control' type='password' id='pass' placeholder='Password' onChange={(e) =>setPassword(e.target.value)}></input>
              <label htmlFor='pass'>Contraseña</label>

            </div>

            <button className='btn btn-primary text-center align-center' onSubmit={() => {navigate('Estudiantes')}}><FontAwesomeIcon icon="fa-solid fa-key" /> Iniciar Sesión</button>

          </form>
        </div>
        
      </div>

    )
}

export default Home;

