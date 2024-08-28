import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { GenerativeModel } from "@google/generative-ai"
// import YTMusic from "ytmusic-api";

@Injectable({
  providedIn: 'root'
})
export class MasterHandlerService {

  // private modelIa: GenerativeModel;
  // private YTApi: YTMusic = new YTMusic();
  // private messageHistory: any[] = [];

  constructor(private http: HttpClient) {
    // this.YTApi.initialize()
    // this.modelIa = new GenerativeModel("AIzaSyCSZBcrAuX2xYMoUoM0e6duPvrjvFvJMyU",
    //   {
    //     model: "gemini-1.5-pro-exp-0801",
    //     generationConfig: {
    //       temperature: 0.0 // Ajuste a temperatura conforme necessário
    //     }
    //   }
    // )
  }

  async getMusica(musicName: string) {
    // const songs = await this.YTApi.searchSongs(musicName);
    // return songs
  }

  async getWeatherForecast(CityName: string) {

  }

  async getGptResponse(input: string) {

  }

  private async getResponse(input: string) {
    // try {
    //   // Adiciona a mensagem do usuário ao histórico
    //   this.messageHistory.push({ role: "user", content: input });
    //   if (this.messageHistory.length >= 2) {
    //     this.messageHistory.shift()
    //   }

    //   const prompt = this.messageHistory.map(msg => `${msg.role}: ${msg.content}`).join("\n");
    //   // Solicita ao modelo uma resposta considerando o histórico
    //   const result = await this.modelIa.generateContent(prompt);
    //   const modelResponse = result.response.text();
    //   this.messageHistory.push({ role: "assistant", content: modelResponse });

    //   return modelResponse;
    // } catch (error) {
    //   return "Desculpe, algo deu errado internamente"
    // }
  }
}
