// src/mocks/msw.ts
import { setupWorker } from 'msw/browser';
import { getOutdoorEventBookingAPIMock } from './../models/api.msw';

const handlers = getOutdoorEventBookingAPIMock();

// Setup a new MSW instance with the provided handlers.
export const mswServer = setupWorker(...handlers);
