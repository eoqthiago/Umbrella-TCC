import { Router } from "express";
import { communityCreat } from "../repositories/comunnityRepository.js";

const server = Router();

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

export default server;