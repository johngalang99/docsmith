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
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.post('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = 'imman.galang@gmail.com';
    const password = 'password';
    const softwareID = 'ac19014a7ac320b86fe7412a1b057691'; // Enter softwareID here
    try {
        const hashedPassword = crypto_1.default.createHash('sha512').update(password).digest('hex');
        const response = yield axios_1.default.post('https://secure.tracksmit.com/api/v1/token', {
            email,
            password: hashedPassword,
            softwareID
        });
        const { data } = response;
        res.json({ token: data.token });
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
app.post('/messages/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var username = '6b27bbd6163f76abfbcee8f0f37f5d37';
    var auth = 'Basic ' + Buffer.from(username + ':').toString('base64');
    try {
        const response = yield axios_1.default.post('http://secure.tracksmit.com/api/v1/messages/new', {
            title: "This is new message title from Hiren testcase",
            physicalParties: [
                {
                    firstName: "John",
                    lastName: "backham",
                    address1: "880 Bergen Avenue,",
                    city: "Jersey City",
                    state: "NJ",
                    postalCode: "07306",
                },
            ],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
            },
        });
        res.json({ data: response.data });
    }
    catch (error) {
        res.json({ error: error });
    }
}));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
