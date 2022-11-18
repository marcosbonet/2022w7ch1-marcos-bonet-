import mongoose from 'mongoose';
import { dbConnect } from '../DB.connect';
import { PLayerRepository } from './player.mongo.repository';

const PlayerMock = [
    {
        player: 'string',
        position: 'string',
        age: 2,
        club: 'string',
        marketPrice: 'string',
    },
    {
        player: 'string',
        position: 'string',
        age: 3,
        club: 'string',
        marketPrice: 'string',
    },
];

describe('Given ...', () => {
    const repository = new PLayerRepository();

    let testIds: Array<string>;
    beforeAll(async () => {
        await dbConnect();
        await repository.getModel().deleteMany();
        await repository.getModel().insertMany(PlayerMock);
        const data = await repository.getModel().find();
        testIds = [data[0].id, data[1].id];
    });

    test('Then getAll...', async () => {
        const result = await repository.getAll();
        expect(result[0].player).toEqual(PlayerMock[0].player);
    });
    test('the get should have been called', async () => {
        const result = await repository.get(testIds[0]);
        expect(result.club).toBe('string');
    });
    test('the post should have been called', async () => {
        const newPlayer = {
            player: 'string',
            position: 'string',
            age: 3,
            club: 'string',
            marketPrice: 'string',
        };
        const result = await repository.post(newPlayer);
        expect(result).toEqual(newPlayer.player);
    });
    test('the patch should have been called', async () => {
        const result = await repository.patch('', PlayerMock[0]);
        expect(result).toEqual(PlayerMock);
    });
    test('the delete should have been called', async () => {
        const result = await repository.delete(testIds[1]);
        expect(result).toEqual([]);
    });

    test('Then id is bad forman', async () => {
        expect(async () => {
            await repository.delete('');
        }).rejects.toThrowError(mongoose.Error.CastError);
    });
    afterAll(() => {
        mongoose.disconnect();
    });
});
