import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterHandlerService } from '../services/master-handler.service';

@Injectable({
    providedIn: 'root'
})
export class AssistantFacade {

    constructor(private masterHandlerService: MasterHandlerService) { }

    async handlerInput(input: string) {
        if (input.includes("jarvis")) {
            if (input.includes("tocar") || input.includes("musica") || input.includes("banda")) {
                // procurar por banda
                if (input.includes("banda")) {
                    const regex = /(?:banda)\s+(\w+)/
                    const match = input.match(regex)[1];
                    if (match) {
                        const musicVideos = await this.masterHandlerService.getMusica(match);
                        return {
                            data: musicVideos,
                            type:"song",
                            message: `aqui esta musicas da banda ${match}, aproveite o som na faixa`
                        }
                    }

                } // procurar por musica individual
                else {
                    const regex = /(?:banda)\s+(\w+)/
                    const match = input.match(regex)[1];
                    if (match) {
                        const musicVideo = await this.masterHandlerService.getMusica(match);
                        return {
                            data: musicVideo[0],
                            type:"song",
                            message: `aqui esta musica ${match} que o senhor pediu, aproveite o som na faixa`
                        }
                    }
                }
            }
        }
    }
}
