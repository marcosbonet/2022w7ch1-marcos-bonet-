import fs from 'fs/promises';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import { Data } from './repository';
import { PlayerTypes } from '../interfaces/Argentinian.player';
dotenv.config();

export class PlayerFileData implements Data<PlayerTypes> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = process.env.DATA_FILE || '';
    }

    async getAll(): Promise<Array<PlayerTypes>> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const saveArr = JSON.parse(data) as PlayerTypes;
            return saveArr.players;
        });
    }

    async get(id: number): Promise<PlayerTypes> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Array<PlayerTypes>;
            const item = aData.find((item) => item.id === id);
            if (!item) throw new Error();
            return item;
        });
    }

    async post(newTask: Partial<PlayerTypes>): Promise<PlayerTypes> {
        const aData = await this.getAll();
        const finalTask = { ...(newTask as PlayerTypes), id: this.#createID() };
        aData.push(finalTask);
        await this.#saveData({ players: aData });
        return finalTask;
    }

    async patch(
        id: number,
        updateTask: Partial<PlayerTypes>
    ): Promise<PlayerTypes> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData[index] = {
            ...aData[index],
            ...updateTask,
        };
        await this.#saveData({ players: aData });
        return aData[index];
    }

    async delete(id: number): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData.filter((item) => item.id !== id);
        await this.#saveData({ players: aData });
    }

    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }

    #saveData(data: Players) {
        return fs.writeFile(this.dataFileURL, JSON.stringify(data));
    }
}
