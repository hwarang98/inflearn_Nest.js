"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCat = exports.patchCat = exports.putCat = exports.createCat = exports.readCat = exports.readAllCat = void 0;
const cats_model_1 = require("./cats.model");
const readAllCat = (req, res) => {
    try {
        const cats = cats_model_1.Cat;
        res.status(200).send({
            success: true,
            data: {
                cats,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};
exports.readAllCat = readAllCat;
const readCat = (req, res) => {
    try {
        const params = req.params;
        console.log(params);
        const cat = cats_model_1.Cat.find((cat) => {
            return cat.id === params.id;
        });
        res.status(200).send({
            success: true,
            data: {
                cat,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};
exports.readCat = readCat;
const createCat = (req, res) => {
    try {
        const data = req.body;
        cats_model_1.Cat.push(data);
        res.status(200).send({
            success: true,
            data: { data },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};
exports.createCat = createCat;
const putCat = (req, res) => {
    try {
        const params = req.params;
        const body = req.body;
        let result;
        cats_model_1.Cat.forEach((cat) => {
            if (cat.id === params.id) {
                cat = body;
                result = cat;
            }
        });
        res.status(200).send({
            success: true,
            data: {
                cat: result,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};
exports.putCat = putCat;
const patchCat = (req, res) => {
    try {
        const params = req.params;
        const body = req.body;
        let result;
        cats_model_1.Cat.forEach((cat) => {
            if (cat.id === params.id) {
                cat = Object.assign(Object.assign({}, cat), body);
                result = cat;
            }
        });
        res.status(200).send({
            success: true,
            data: {
                cat: result,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};
exports.patchCat = patchCat;
const deleteCat = (req, res) => {
    try {
        const params = req.params;
        const newCat = cats_model_1.Cat.filter((cat) => cat.id !== params.id);
        res.status(200).send({
            success: true,
            data: newCat,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};
exports.deleteCat = deleteCat;
//# sourceMappingURL=cat.service.js.map