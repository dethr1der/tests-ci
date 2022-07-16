var stairsController = require('../controllers/calculator');
const stairsRouter = require('../routes/stairs')
const {query} = require("express-validator");
const express = require('express');
var router = express.Router();

jest.mock('../controllers/calculator', () => {
    const controller = jest.requireActual('../controllers/calculator');
    jest.spyOn(controller, "calculate");
    return controller
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('Check the controller', ()=>{

    test('should trigger the send method of controller', async ()=>{
        const req = {query: { bends: '2', height: '1', levels: '1' }}
        const res = mockResponse();
        await stairsController.calculate(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ price:"14200 PLN" } )
    })

    test('should return 400 bad request if bends are not provided', async ()=>{
        const req = {query: { height: '1', levels: '1' }}
        const res = mockResponse();
        await stairsController.calculate(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    })

    test('should return 400 bad request if height is not provided', async ()=>{
        const req = {query: { bands: '2', levels: '1' }}
        const res = mockResponse();
        await stairsController.calculate(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    })

    test('should return 400 bad request if levels are not provided', async ()=>{
        const req = {query: { bands: '2', height: '1' }}
        const res = mockResponse();
        await stairsController.calculate(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    })


})