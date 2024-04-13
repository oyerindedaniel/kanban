import { http, HttpResponse } from 'msw';

export const handlers = [http.get('https://kanban/*', () => HttpResponse.json({ id: 'abc-123' }))];
