import Express from "express";
import loginControl from '../Controllers/login.controller.js';


const Router = Express.Router();
const { loginPage, registrar, login } = loginControl;

Router.get('/', loginPage);
Router.post('/api/admon/addUsuario', registrar)
Router.post('/api/login', login)

export default Router;