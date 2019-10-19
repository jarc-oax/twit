const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

//Rendirizar el index.ejs
router.get('/', (req, res)=>{
	res.render('index');
});

router.get('/obtenerUsuarios', async (req, res)=>{
    const usuarios = await Usuario.find();

    /*const t = [
        {
			+
            "titulo": "Tarea 1",
            "responsable": "Marcos",
            "descripcion": "lorem impsum 1",
            "prioridad": "baja"
        }
    ];*/

    res.json(usuarios);
    console.log(usuarios);
    //res.render('index', {
        //tasks // Es lo mismo que decir task: task
    //});
});

router.post('/agregarUsuario', async(req, res)=>{
	console.log(req.body);
    //console.log(new Usuario(req.body));
	const usuario= new Usuario(req.body);
	await usuario.save();

	//res.send('Petición recibida');
	res.redirect('/');
})





router.get('/editarUsuario/:id', async (req, res)=>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('edit', {
        usuario
    });
});

router.post('/editarUsuario/:id', async (req, res)=>{
    const{id} = req.params;
    await Usuario.update({_id:id}, req.body);
    res.redirect('/');
});

router.get('/hecho/:id', async (req, res)=>{
    // console.log(req.params);
    const {id} = req.params;
    const task = await Task.findById(id);
    task.estadocivil = !task.estadocivil;
    await task.save();
    //console.log(task);
    //res.send('Peticion recibida');
    //await Task.remove({_id: id});
    res.redirect('/');
});

router.get('/eliminarRegistro/:id', async (req, res)=>{
    // console.log(req.params);
    const {id} = req.params;
    // res.send('Peticion recibida');
    await Task.remove({_id: id});
    res.redirect('/');
});


module.exports = router;
