import { Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Assistant';
  private utterance;

  constructor() {
    afterNextRender(async () => {
      // Cria uma nova instância de SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance('Olá, como você está?');
      this.utterance = utterance; 
      // Define a voz e outras propriedades (opcional)
      utterance.voice = speechSynthesis.getVoices()[0] // Seleciona a primeira voz disponível
      utterance.pitch = -10; // Ajusta o tom
      utterance.rate = 2; // Ajusta a velocidade
      // Inicia a síntese de fala 
    });
  }
  
  speak(){
    speechSynthesis.speak(this.utterance);
  }
}
