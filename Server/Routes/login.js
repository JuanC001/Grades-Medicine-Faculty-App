import Express from "express";
import loginControl from '../Controllers/login.controller.js';


const Router = Express.Router();
const { loginPage, registrar, login, eliminarCuenta } = loginControl;

Router.get('/', loginPage);
Router.post('/api/admon/addUsuario', registrar);
Router.post('/api/login', login);

Router.post('/api/eliminarUser', eliminarCuenta);


export default Router;