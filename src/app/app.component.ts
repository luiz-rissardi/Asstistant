import { CommonModule } from '@angular/common';
import { afterNextRender, AfterRenderRef, ChangeDetectionStrategy, Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AssistantFacade } from './facade/assistantFacade';
import { MusicComponent } from './components/music/music.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MusicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {
  title = 'Assistant';
  protected isAnimated = false
  private utterance: any;
  private recognition: any;
  protected resultIA: WritableSignal<any> = signal("");

  constructor(private assistantFacade: AssistantFacade) {
  }

  ngOnInit(): void {
    const SpeechRecognition = (window as any).webkitSpeechRecognition
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true; // Continua reconhecendo mesmo após uma pausa
    this.recognition.lang = 'pt-BR'; // Define o idioma para Português Brasileiro

    // Define o que fazer quando a fala for reconhecida
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const result = this.assistantFacade.handlerInput(transcript)
      result.sourceData.subscribe(data => {
        this.resultIA.set({ ...result, data });
        this.speak(result.message)
      })
      this.recognition.stop();
      this.isAnimated = false;
    };

    setTimeout(() => {
      const result = this.assistantFacade.handlerInput("jarvis tocar a música dont stop beliven")
      result.sourceData.subscribe(data => {
        this.resultIA.set({ ...result, data });
        this.speak(result.message)
      })
    }, 1000);


    this.recognition.onerror = (event: any) => {
      this.recognition.stop();
      this.isAnimated = false;
      alert("Erro de reconhecimento de fala");
    };

    this.recognition.onend = () => {
      this.isAnimated = false;
    };

  }

  start() {
    // Define a voz e outras propriedades (opcional)
    this.isAnimated = true;
    this.utterance = new SpeechSynthesisUtterance();
    // Define a voz e outras propriedades (opcional)
    this.utterance.voice = speechSynthesis.getVoices()[0] // Seleciona a primeira voz disponível
    this.utterance.pitch = -2; // Ajusta o tom
    this.utterance.rate = 1; // Ajusta a velocidade
    this.recognition.start();

  }

  speak(output: string) {
    this.utterance.text = output;
    speechSynthesis.speak(this.utterance);
  }
}



/**
 * import { CommonModule } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AssistantFacade } from './facade/assistantFacade';
import { MusicComponent } from './components/music/music.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MusicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection:ChangeDetectionStrategy.OnPush
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
        const this.recognition = new SpeechRecognition();
        this.recognition.continuous = true; // Continua reconhecendo mesmo após uma pausa
        this.recognition.lang = 'pt-BR'; // Define o idioma para Português Brasileiro

        this.recognition.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          const result = this.assistantFacade.handlerInput(transcript)
          result.sourceData.subscribe(data => {
            this.resultIA.set({ ...result, data });
            this.speak(result.message)
          })
        };

        // Inicia o reconhecimento de fala
        this.recognition.start();

        // setTimeout(async () => {
        //   const result = this.assistantFacade.handlerInput("jarvis tocar banda acdc")
        //   result.sourceData.subscribe(data => {
        //     this.resultIA.set({ ...result, data });
        //     this.speak(result.message)
        //   })
        // }, 3000);

        setTimeout(() => {
          alert("parando");
          this.recognition.stop()
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

 */