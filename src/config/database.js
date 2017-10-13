import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

function connect(connectionString) {
    mongoose.connect(connectionString, {
        useMongoClient: true
    }).then(() => {
        console.log('Successfully conected!');
    }).catch(console.error.bind(console, 'Connection error: '));
}

function connectionString(host, db) {
    return `mongodb://${host}/${db}`;
}

function authenticatedConnectionString(host, user, password, db) {
    return `mongodb://${user}:${password}@${host}/${db}`;
}

function createConnectionString(host, user, password, db) {
    let connectionString;
    if (!user || !password) {
        connectionString = connectionString(host, database);
    } else {
        connectionString = authenticatedConnectionString(host, user, password, db);
    }

    return connectionString;
}


function connectToDatabase(database, host, user, password) {
    const connectionString = createConnectionString(host, user, password, database);
    connect(connectionString);
}

export default {
    connectToDatabase,
    connect
};