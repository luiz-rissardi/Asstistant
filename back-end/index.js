import express from "express";
import http from "http";
import cors from "cors"
import { AssistantController } from "./controller.js";

const app = express();
const server = http.createServer(app);
const controller = new AssistantController()

app.use(cors())
app.use(express.json())

app.get('/api/ia/music', async (req, res) => {
    const { music } = req.query;
    if (music) {
        const result = await controller.getMusica(music);
        res.json(result);
        return;
    }
    res.end("musica inválida")
});

app.post("/api/ia/command", (req, res) => {
    const { query } = req.body;
    const result = controller.getCommand(query);
    res.write(result);
    res.end();
})


server.listen(process.env.PORT || 3000, () => {
    console.log(`server is running at port ${server.address().port}`);
})