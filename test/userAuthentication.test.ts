import chai from 'chai';
import config from "config";

import express, { Request, Response } from "express";
import chaiHttp = require('chai-http')
import { request, expect } from 'chai';
import { app } from "../src/app"
import User from "../src/model/user.model"

chai.use(chaiHttp);

const host = config.get("host") as string;
const port = config.get("port") as string;

describe('user authentication', () => {
    describe('/ POST signup', () => {
        it('it should register a user', async () => {
            let user = {
                email: "test@gmail.com",
                name: "test",
                password: "test123"
            }
            const res = await request(host+":"+port).post('/api/v1/signup').send(user);
            expect(res).to.have.status(200);
            expect(res).to.be.a('object');
        });
    });

    describe('/ POST sessions', () => {
        it('it should create a user session and return access and refresh token', async () => {
            let user = {
                email: "test@gmail.com",
                password: "test123"
            }
            const res = await request(host+":"+port).post('/api/v1/sessions').send(user);
            expect(res).to.have.status(200);
            expect(res).to.be.a('object');
            expect(res.body).to.have.property('accessToken');
            expect(res.body).to.have.property('refreshToken');
        });
    });

});

///
