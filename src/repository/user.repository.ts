import mongoose, { Schema, model } from 'mongoose';

import { ProtoUser, UserTypes } from '../entities/entities.js';

export class UserRepository {
    #schema = new Schema({
        id: String,
        name: String,
        email: String,
        password: String,
        roll: String,
    });
    #Model = model('UserTypes', this.#schema, 'players');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }

    async post(data: ProtoUser): Promise<UserTypes> {
        const result = await this.#Model.create(data);
        return result as UserTypes;
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
