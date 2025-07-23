const app = require("./app");
const { connectDB } = require("./db/connection");

// connections
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started and connected to DB on port ${PORT} 🚀🚀`);
  });
})
.catch((err) => console.log(err))
