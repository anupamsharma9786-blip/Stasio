import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/connectDB.js";
import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"])

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	try {
		await connectDB();

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Failed to start server:", error.message);
		process.exit(1);
	}
};

startServer();
