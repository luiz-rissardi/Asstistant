import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterHandlerService {

  constructor(private http:HttpClient) { }

  async handlerInput(input: string) {
    if (input.includes("jarvis")) {
      if (input.includes("tocar") || input.includes("musica")) {
        const regex = /(?:musica|tocar)\s+(.*)/i; // 'i' para ignorar maiúsculas/minúsculas
        const match = input.match(regex);
        if(match){
        }

      }
    }
  }
}
