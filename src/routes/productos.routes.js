import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get('/productos', async (req, res)=>{
    const productos = await prisma.producto.findMany();
    res.status(200).json(productos);
});

router.get("/productos/:id", async (req,res)=>{
    try{
        const idProducto = parseInt(req.params.id);
        const encontrado = await prisma.producto.findFirst({
            where:{
                id : idProducto
            }
        });
        if (!encontrado){
            res.status(404).json({
                "error" : "Error registro no econtrado"
            });  
        }else{
            res.status(200).json(encontrado);
        }
    }catch(error){
        console.log("A ocurrido un error:",error.msg);
        res.status(500).json({
            "error" : "Ocurrió un error en el servidor"
        });       
    }
});

router.post("/productos", async (req, res)=>{
    try{
        const productoAgregado = await prisma.producto.create({
            data : {
                "nombre": req.body.nombre,
                "precio" : parseFloat(req.body.precio),
                "categoriaId" : parseInt(req.body.categoriaId)
            }
        });
        res.status(201).json({
            "msg" : "Registro agregado exitosamente"
        })
    }catch(error){
        console.log("A ocurrido un error:",error.msg);
        res.status(500).json({
            "error" : "Error al intentar agregar el registro"
        });
    }
});

router.put("/productos/:id", async (req, res)=>{

    try{
        const idProducto = parseInt(req.params.id);
        const encontrado = await prisma.producto.findFirst({
            where:{
                id : idProducto
            }
        });
        if (!encontrado){
            res.status(404).json({
                "error" : "Error registro no econtrado"
            });  
        }else{
           // Agregar la actualizacion
           const tempo = {
            "nombre " : req.body.nombre,
            "precio" : parseFloat(req.body.precio),
            "categoriaId" : parseInt(req.body.categoriaId)
           }
           console.log(tempo);
           const actualizadoProducto = await prisma.producto.update({
                where : {
                    id: idProducto
                },
                data : tempo
           })
            res.status(200).json({
                "msg" : "Registro actualizado"
            });
        }
    }catch(error){
        console.log(error.message+" "+error.meta);
        res.status(500).json({
            "msg1" : error.message+" "+error.meta
        });       
    }
});

router.delete("/productos/:id", async (req, res)=>{
    try{
        const idProducto = parseInt(req.params.id);
        const encontrado = await prisma.producto.findFirst({
            where:{
                id : idProducto
            }
        });
        if (!encontrado){
            res.status(404).json({
                "error" : "Error registro no econtrado"
            });  
        }else{
           // Agregar la actualizacion

           const borradoProducto = await prisma.producto.delete({
                where : {
                    id: idProducto
                }
           })
            res.status(200).json({
                "msg" : "Registro borrado"
            });
        }
    }catch(error){
        console.log(error.message+" "+error.meta);
        res.status(500).json({
            "msg1" : error.message+" "+error.meta
        });       
    }
});

export default router;