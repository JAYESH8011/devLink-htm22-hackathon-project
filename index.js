const app = require("./app")
const PORT = process.env.PORT || 8080

app.listen(PORT, () =>
    console.log(`server is up and running at http://localhost:${PORT}`)
)
