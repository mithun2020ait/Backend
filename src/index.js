import dotenv from 'dotenv';
import connectionDB from './config/database.js';
import app from './app.js';

dotenv.config({
    path : './.env'
});

const startServer = async () => {
    try {
        await connectionDB();
        app.on('error', (error) => {
            console.log("Server error:", error);
            throw error;
        });
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("Server not starting", error);
        
    }
}

startServer();
