import { createToken, verifyToken } from './aut';
import jwt from 'jsonwebtoken';

const mock = { userName: 'pepe' };
describe('given createToken', () => {
    test('then... ', () => {
        const signSpy = jest.spyOn(jwt, 'sign');
        const r = createToken(mock);
        expect(typeof r).toBe('string');
        expect(signSpy).toHaveBeenCalled();
    });
});
describe('given readToken', () => {
    const token = createToken(mock);

    test('then... ', () => {
        const r = verifyToken(token);
        expect(r.userName).toEqual(mock.userName);
    });
});

describe('when the token is no valid', () => {
    const token = 'df';
    test('should', () => {
        expect(() => {
            verifyToken(token);
        }).toThrow();
    });
});
