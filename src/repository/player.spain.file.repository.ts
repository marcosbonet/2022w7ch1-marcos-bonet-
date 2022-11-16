import fs from 'fs/promises';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { PlayerSpainTypes } from '../interfaces/spain.Player.js';
import { Data, id } from './repository.js';

export class PlayerSpainFileData implements Data<PlayerSpainTypes> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = process.env.DATA_FILE || '';
    }

    async getAll(): Promise<Array<PlayerSpainTypes>> {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data).tasks as Array<PlayerSpainTypes>);
    }

    async get(id: id): Promise<PlayerSpainTypes> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data).tasks as Array<PlayerSpainTypes>;
            const item = aData.find((item) => item.id === id);
            if (!item) throw new Error('Not found id');
            return item;
        });
    }

    async post(newTask: Partial<PlayerSpainTypes>): Promise<PlayerSpainTypes> {
        const aData = await this.getAll();
        const finalTask = {
            ...(newTask as PlayerSpainTypes),
            id: this.#createID(),
        };
        aData.push(finalTask);
        await this.#saveData(aData);
        return finalTask;
    }

    async patch(
        id: id,
        updateTask: Partial<PlayerSpainTypes>
    ): Promise<PlayerSpainTypes> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData[index] = {
            ...aData[index],
            ...updateTask,
        };
        await this.#saveData(aData);
        return aData[index];
    }

    async delete(id: id): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (index < 0) throw new Error('Not found id');
        const finalData = aData.filter((item) => item.id !== id);
        await this.#saveData(finalData);
    }

    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }

    #saveData(data: Array<PlayerSpainTypes>) {
        const finalData = { tasks: data };
        return fs.writeFile(this.dataFileURL, JSON.stringify(finalData));
    }
}
