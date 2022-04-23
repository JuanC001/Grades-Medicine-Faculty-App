import React from 'react'
import './LE.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ListaEstudiantes(props) {

  return (
    <div className="card mb-3 card-list text-center container-fluid">

      <div className="row g-0">

        <div className="col-md-2">

          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className="img-fluid rounded-start" alt="" />
          {/*<img src="https://i.ytimg.com/vi/behMdSzPl0Y/maxresdefault.jpg" className="img-fluid rounded-start" alt="" />*/}

        </div>

        <div className="col">

          <div className="card-body">
            <div className="container">
              <div className="row pb-3">

                <div className="col-md-4">
                  <div className='input-group'>
                    <label className='input-group-text input-group-sm' htmlFor='Nombre_est'>Nombre</label>
                    <input type='text' disabled readonly value={props.estudiante.nombres} className=' form-control-sm' id='Nombre_est' name='Nombre_est' />
                  </div>
                </div>

                <div className="col">
                  <div className='input-group'>
                    <label className='input-group-text input-group-sm' htmlFor='cedula'>CC</label>
                    <input type='text' disabled readonly value={props.estudiante.documento} className=' form-control-sm' id='cedula' name='cedula' />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className='input-group'>
                    <label className='input-group-text input-group-sm' htmlFor='Correo'>Correo</label>
                    <input type='text' disabled readonly value={props.estudiante.correo} className=' form-control-sm' id='Correo' name='Correo' />
                  </div>
                </div>

              </div>

            </div>

            <div className="container">

              <div className="row">

                <div className="col border border-1">

                  <h1 className="display-6 grilla">Nota1</h1>

                </div>

                <div className="col border border-1">

                  <h1 className="display-6 grilla">Nota2</h1>

                </div>

                <div className="col border border-1">

                  <h1 className="display-6 grilla">Nota3</h1>

                </div>

                <div className="col border border-1">

                  <h1 className="display-6 grilla">Nota4</h1>

                </div>

                <div className="col border border-1">

                  <h1 className="display-6 grilla">Nota5</h1>

                </div>

                <div className="col border border-1">

                  <h1 className="display-6 grilla">Nota6</h1>

                </div>

              </div>

              <div className="row">

                <div className="col border border-1">

                  <h1 className="display-6 grilla">{props.estudiante.rotacion1.nota}</h1>

                </div>

                <div className="col border border-1">

                  <h1 className="display-6 grilla">{props.estudiante.rotacion2.nota}</h1>

                </div>

                <div className="col border border-1">

                  <h1 className="display-6 grilla">{props.estudiante.rotacion3.nota}</h1>

                </div>

                <div className="col border border-1">

                  <h1 className="display-6 grilla">{props.estudiante.rotacion4.nota}</h1>

                </div>

                <div className="col border border-1">

                  <h1 className="display-6 grilla">{props.estudiante.rotacion5.nota}</h1>

                </div>

                <div className="col border border-1">

                  <h1 className="display-6 grilla">{props.estudiante.rotacion6.nota}</h1>

                </div>

              </div>

            </div>

          </div>

        </div>
        <div className="col-md-1 pt-3 pb-3">

          <div className=" mx-auto container-fluid w-75 rounded rounded-3">
            <div className="">
              <div className="row justify-content-center pb-2">

                <button className="btn btn-primary w-50"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></button>

              </div>

              <div className="row justify-content-center pb-2">
                <button className="btn btn-primary w-50"><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
              </div>

              <div className="row justify-content-center">
                <button className="btn btn-primary w-50"><FontAwesomeIcon icon="fa-solid fa-eye" /></button>
              </div>

            </div>
          </div>

        </div>

      </div>


    </div>

  )
}
