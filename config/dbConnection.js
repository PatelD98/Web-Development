const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
        console.log(
            "MongoDB Connected: ",
            conn.connection.host, 
            conn.connection.name
        );
    } catch (err) {
        console.error(`Error: ${err}`);
        process.exit(1);
    }
}

module.exports = connectDb;