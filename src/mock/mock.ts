// src/mocks/handlers.js
import { http } from 'msw';

export const handlers = [
  http.post('/v1/api/register-user', (_req, res, ctx) => {
    console.log('Captured a "POST /v1/api/register-user" request');
    return res(ctx.json({ code: 201, message: 'User created successfully' }));
  }),

  http.post('/v1/api/register-vendor', (_req, res, ctx) => {
    console.log('Captured a "POST /v1/api/register-vendor" request');
    return res(ctx.json({ code: 201, message: 'Vendor created successfully' }));
  }),
];
