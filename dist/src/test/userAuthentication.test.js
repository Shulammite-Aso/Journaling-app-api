"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const config_1 = __importDefault(require("config"));
const chaiHttp = require("chai-http");
const chai_2 = require("chai");
chai_1.default.use(chaiHttp);
const host = config_1.default.get("host");
const port = config_1.default.get("port");
describe('user authentication', () => {
    // beforeEach(function() {
    //     return User.remove({'name':'test'});
    //   });
    describe('/ POST signup', () => {
        it('it should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
            let user = {
                email: "test@gmail.com",
                name: "test",
                password: "test123"
            };
            const res = yield chai_2.request(host + ":" + port).post('/api/v1/signup').send(user);
            chai_2.expect(res).to.have.status(200);
            chai_2.expect(res).to.be.a('object');
        }));
    });
    describe('/ POST sessions', () => {
        it('it should create a user session and return access and refresh token', () => __awaiter(void 0, void 0, void 0, function* () {
            let user = {
                email: "test@gmail.com",
                password: "test123"
            };
            const res = yield chai_2.request(host + ":" + port).post('/api/v1/sessions').send(user);
            chai_2.expect(res).to.have.status(200);
            chai_2.expect(res).to.be.a('object');
            chai_2.expect(res.body).to.have.property('accessToken');
            chai_2.expect(res.body).to.have.property('refreshToken');
        }));
    });
});
after(function () {
    return __awaiter(this, void 0, void 0, function* () {
        let user = {
            email: "test@gmail.com",
            name: "test",
            password: "test123"
        };
        const res = yield chai_2.request(host + ":" + port).post('/api/v1/test').send(user);
    });
});
///
