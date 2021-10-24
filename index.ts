import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    try {
        await mongoose.connect('mongodb+srv://manas28:subham2808@cluster0.fnmec.mongodb.net/flarium', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Connected to mongoose');
    } catch (error) {
        throw new Error('Error connecting to database!');
    }

    const port = process.env.PORT || 2000;

    app.listen(port, () => {
        console.log('Listening on port:' + port);
    });

    // const io = socket.init(server);
    // io.on('connection', (socket) => {
    //     socket.on('disconnect', (reason) => {
    //         console.log('disconnected '+ reason);
    //     });
    // });
}

start();