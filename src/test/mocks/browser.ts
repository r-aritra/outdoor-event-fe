import { getOutdoorEventBookingAPIMock } from '../../models/api.msw';

import registerUser from './json/registerUser.json';

import { setupWorker } from 'msw/browser';
import { HttpResponse, delay, http } from 'msw';

const mockHandlers = [
  http.post('*/v1/api/register-user', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(registerUser), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];

export const handlers = [...mockHandlers, ...getOutdoorEventBookingAPIMock()];
export const worker = setupWorker(...handlers);
