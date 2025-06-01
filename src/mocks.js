// mocks.js

import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:4000/patientCollection/', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    "patientFName": "Dhiraj",
                    "patientMName": "",
                    "patientLName": "Kaushik",
                    "gender": "male",
                    "birthDate": "1998-11-08",
                    "bloodGroup": "A+",
                    "contactNumbers": "8398892355",
                    "diseasesDescription": "unknown disease",
                    "address": "Unknown address",
                    "id": 2
                }
            ])
        );
    }),
    rest.delete('http://localhost:4000/patientCollection/:id', (req, res, ctx) => {
        return res(ctx.status(204));
    }),
];
