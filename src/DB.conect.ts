import mongoose from 'mongoose';
import { USER, CLUSTER, PASSW } from './config.js';

export function dbConnect() {
    const DBName = 'Players';
    let uri = `mongodb+srv://${USER}:${PASSW}`;
    uri += `@${CLUSTER}/${DBName}?retryWrites=true&w=majority`;
    console.log(mongoose.connection.readyState);
    console.log({ uri });
    return mongoose.connect(uri);
}
