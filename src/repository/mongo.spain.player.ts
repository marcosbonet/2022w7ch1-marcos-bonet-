import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import mongoose, { model } from 'mongoose';
const DBname = 'SpainPlayer';
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSW}@${process.env.CLUSTER}/${DBname}?retryWrites=true&w=majority`;

const playerSchema = new mongoose.Schema({
    title: mongoose.SchemaTypes.String,
    responsible: String,
    isCompleted: Boolean,
});

const main = async () => {
    const connector = await mongoose.connect(uri);
    console.log(connector);

    const Player = model('Player', playerSchema, 'Players');
    Player.find();
    //Player.findById();
    Player.create();
    Player.findByIdAndUpdate();
    Player.findByIdAndDelete();

    await Player.create({
        player: 'Pablo Martín Páez Gavira',
        position: 'Centrocampista',
        age: 18,
        club: 'Barcelona',
        id: 1,
    });
};
main();
