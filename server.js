import express from 'express'


const app = express()
app.use(express.json())

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

app.get('/atividade', async (req, res)=>{
    const users = await prisma.user.findMany()
    res.status(200).json(users);
});

app.post('/atividade', async(req, res)=>{
    await prisma.user.create({
        data: {
            id: req.body.id,
            email: req.body.email,
            nome: req.body.nome,
            numero: req.body.numero
        }
    });
    res.status(201).json(req.body);
});

app.put('/atividade/:id', async(req, res)=>{
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data: {
            id: req.body.id,
            email: req.body.email,
            nome: req.body.nome,
            numero: req.body.numero
        }
    });
    res.status(201).json(req.body);
});

app.delete('/atividade/:id', async(req, res)=>{
    await prisma.user.delete({
        where:{
            id: req.params.id
        },
    });
    res.status(200).json({message: "deletado com sucesso!!"});
});



app.listen(3000);
