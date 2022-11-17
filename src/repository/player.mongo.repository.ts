import mongoose, { Schema, model } from 'mongoose';
import { PlayerProto, PlayerTypes } from '../interfaces/argentinian.Player.js';
import { Data } from './repository.js';

export class PLayerRepository implements Data<PlayerTypes> {
    #schema = new Schema({
        player: String,
        position: String,
        age: Number,
        club: String,
        marketPrice: String,
    });
    #Model = model('PlayerTypes', this.#schema, 'players');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }

    async getAll(): Promise<Array<PlayerTypes>> {
        return this.#Model.find();
    }
    async get(id: string): Promise<PlayerTypes> {
        const result = await this.#Model.findById(id); //as PlayerTypes;
        if (!result) throw new Error('Not found id');
        return result as PlayerTypes;
    }

    async post(data: PlayerProto): Promise<PlayerTypes> {
        const result = await this.#Model.create(data);
        return result as PlayerTypes;
    }
    async patch(id: string, data: Partial<PlayerTypes>): Promise<PlayerTypes> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as PlayerTypes;
    }

    async delete(id: string): Promise<void> {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null) throw new Error('Not found id');
        return;
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
