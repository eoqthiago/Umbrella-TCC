import { Router } from "express";
import { communityCreat, communityEdit, communityGet, communityUser, communityAdmin } from "../repositories/comunnityRepository.js";

const server = Router();


//Adicionar usuario na comunidade
server.post("/comunidade/convite", (req, res) => {
    try {
        const userId = req.query.user;
        const community = req.query.community;
        const r = communityUser(userId, community);
        res.status(200).send(r);
    } catch (err) {
        res.status(401).send({
            err: err.message
        });
    };
});


// Criar comunidade
server.post("/comunidade", async (req, res) => {
    try {
        const user = req.query.user;
        const community = req.body;
        switch (true) {
            case !user: throw new Error("Não autorizado");
            case !community.name || !community.name.trim(): throw new Error("A comunidade deve possuir um nome");
            case !community.desc || !community.desc.trim(): throw new Error("A comunidade deve possuir uma descrição");
            case !user: throw new Error('Não autorizado');
            default: break;
        };
        const r = await communityCreat(user, community);
        res.status(201).send(r.data);
    } catch (err) {
        res.status(401).send({
            err: err.message
        });
    };
});

// Alterar comunidade 
server.put("/comunidade", async (req, res) => {
    try {
        const community = req.body;
        if (!community.id || !community.id.trim()) throw new Error("O grupo precisa de um ID");
        if (!community.name || !community.name.trim()) throw new Error("O grupo precisa de um ");
        else if(!community.desc || !community.desc.trim()) throw new Error("O grupo precisa de um ");
        else {
            const r = await communityEdit(community);
            res.status(201).send();
        };
    } catch (err) {
        res.status(401).send({
            err: err.message
        });
    }
});

//Consultar todas comunidades
server.get("/comunidade", async (req, res) => {
    try {
        const r = await communityGet();
        res.status(200).send(r);
    } catch (err) {
        res.status(401).send({
            err: err.message
        });
    }
});

//Promover usuario à administrador
server.post("/comunidade/administrador", async (req, res) => {
    try {
        const user = req.body;
        if (!user.id || !user.id.trim()) throw new Error('Usuario não esta na comunidade');
        const r = await communityAdmin(user);
        res.status(202).send();
    } catch (err) {
        res.status(401).send({
            err: err.message
        });
    }
});

export default server;