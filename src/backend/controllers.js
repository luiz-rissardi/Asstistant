import YTMusic from "ytmusic-api";
import { GenerativeModel } from "@google/generative-ai";

export class AssistantController {

    #modelIa;
    #YTApi = new YTMusic();
    #messageHistory = [];

    constructor() {
        this.init()
    }

    async init() {
        await this.#YTApi.initialize()
        this.modelIa = new GenerativeModel("AIzaSyCSZBcrAuX2xYMoUoM0e6duPvrjvFvJMyU",
          {
            model: "gemini-1.5-pro-exp-0801",
            generationConfig: {
              temperature: 1 // Ajuste a temperatura conforme necessário
            }
          }
        )
    }

    async getMusica(musicName) {
        const songs = await this.#YTApi.searchSongs(musicName);
        return songs
    }

    async #getResponse(input) {
        try {
            // Adiciona a mensagem do usuário ao histórico
            this.#messageHistory.push({ role: "user", content: input });
            if (this.#messageHistory.length >= 2) {
                this.#messageHistory.shift()
            }

            const prompt = this.#messageHistory.map(msg => `${msg.role}: ${msg.content}`).join("\n");
            // Solicita ao modelo uma resposta considerando o histórico
            const result = await this.#modelIa.generateContent(prompt);
            const modelResponse = result.response.text();
            this.#messageHistory.push({ role: "assistant", content: modelResponse });

            return modelResponse;
        } catch (error) {
            return "Desculpe, algo deu errado internamente"
        }
    }
}