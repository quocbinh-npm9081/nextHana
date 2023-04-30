import mongoose, { Connection } from "mongoose";

class Database {
  connection = { isConnected: 99 };

  public async connect() {
    const connectionString: string = String(process.env.MONGODB_URL);

    console.log("CHECK CONNECT: ", this.connection.isConnected);

    if (this.connection.isConnected === 1) {
      console.log("already connected");
      return;
    }

    if (mongoose.connections.length > 0) {
      this.connection.isConnected = mongoose.connections[0].readyState;
      if (this.connection.isConnected === 1) {
        console.log("use previous connection");
        return;
      }
      await mongoose.disconnect();
    }

    try {
      const db = await mongoose.connect(connectionString);
      console.log("new connection");
      this.connection.isConnected = db.connections[0].readyState;
    } catch (error) {
      console.log("error connect: ", error);
    }
  }

  public async disconnect() {
    if (this.connection.isConnected === 1) {
      if (process.env.NODE_ENV === "production") {
        await mongoose.disconnect();
        this.connection.isConnected = 3;
      } else {
        console.log("server don't disconnect");
      }
    }
  }
}
const mongoDB = new Database();
export default { mongoDB };
