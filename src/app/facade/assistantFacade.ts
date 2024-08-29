import { Injectable } from '@angular/core';
import { MasterHandlerService } from '../services/master-handler.service';

@Injectable({
    providedIn: 'root'
})
export class AssistantFacade {

    constructor(private masterHandlerService: MasterHandlerService) { }

    handlerInput(input: string) {
        const inputFormat = input.toLocaleLowerCase()
        if (inputFormat.includes("jarvis")) {
            if (inputFormat.includes("tocar") || inputFormat.includes("musica") || inputFormat.includes("banda")) {
                // procurar por banda
                if (inputFormat.includes("banda")) {
                    const regex = /banda\s+(.+)/
                    const match = inputFormat.match(regex)[1];
                    if (match) {
                        const source = this.masterHandlerService.getSongs(match);
                        return {
                            sourceData: source,
                            data:null,
                            type:"song",
                            message: `aqui esta musicas da banda ${match} e musicas semelhantes, aproveite o som na faixa`
                        }
                    }

                } // procurar por musica individual
                else {
                    const regex = /música\s+(.+)/
                    const match = inputFormat.match(regex)[1];
                    if (match) {
                        const source = this.masterHandlerService.getSongs(match);
                        return {
                            sourceData: source,
                            data:null,
                            type:"song",
                            message: `aqui esta musica ${match} e musicas semelhantes, aproveite o som na faixa`
                        }
                    }
                }
            }
        }
    }
}
