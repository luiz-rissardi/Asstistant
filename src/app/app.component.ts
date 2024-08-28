import { CommonModule } from '@angular/common';
import { afterNextRender, Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AssistantFacade } from './facade/assistantFacade';
import { MusicComponent } from './components/music/music.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MusicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Assistant';
  protected isAnimated = false
  private utterance: any;
  protected resultIA: WritableSignal<any> = signal({});

  constructor(private assistantFacade: AssistantFacade) {
    afterNextRender(
      async () => {
        const SpeechRecognition = (window as any).webkitSpeechRecognition
        const recognition = new SpeechRecognition();
        recognition.continuous = true; // Continua reconhecendo mesmo após uma pausa
        recognition.lang = 'pt-BR'; // Define o idioma para Português Brasileiro

        recognition.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          this.resultIA.set(await this.assistantFacade.handlerInput(transcript));
          alert("messagem!!!")
          alert(this.resultIA().message)
          this.speak(this.resultIA().message)
        };

        // Inicia o reconhecimento de fala
        recognition.start();

        setTimeout(() => {
          alert("parando");
          recognition.stop()
        }, 10000);
      })
  }

  start() {
    this.isAnimated = true;
    const utterance = new SpeechSynthesisUtterance();
    this.utterance = utterance;
    // Define a voz e outras propriedades (opcional)
    utterance.voice = speechSynthesis.getVoices()[0] // Seleciona a primeira voz disponível
    utterance.pitch = -2; // Ajusta o tom
    utterance.rate = 2; // Ajusta a velocidade
    this.speak("Boa tarde senhor, como posso ajuda-lo?")

  }


  speak(output: string) {
    this.utterance.text = output;
    speechSynthesis.speak(this.utterance);
  }
}
