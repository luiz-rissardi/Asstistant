import { CommonModule } from '@angular/common';
import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Assistant';
  protected isAnimated = false
  private utterance: any;

  constructor() {
    afterNextRender(async () => {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition();
      recognition.continuous = true; // Continua reconhecendo mesmo após uma pausa
      recognition.lang = 'pt-BR'; // Define o idioma para Português Brasileiro

      // Define o que fazer quando a fala for reconhecida
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        alert(`voce disse ${transcript}`);
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
    const utterance = new SpeechSynthesisUtterance('Olá, como você está?');
    this.utterance = utterance;
    // Define a voz e outras propriedades (opcional)
    utterance.voice = speechSynthesis.getVoices()[0] // Seleciona a primeira voz disponível
    utterance.pitch = -2; // Ajusta o tom
    utterance.rate = 1; // Ajusta a velocidade

  }

  startOnSpeech() {

  }

  speak() {
    speechSynthesis.speak(this.utterance);
  }
}
