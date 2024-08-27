import { CommonModule } from '@angular/common';
import { Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Assistant';
  protected isAnimated = false
  private utterance:any;


  start(){
    this.isAnimated = !this.isAnimated;
    const utterance = new SpeechSynthesisUtterance('Olá, como você está?');
    this.utterance = utterance; 
    // Define a voz e outras propriedades (opcional)
    utterance.voice = speechSynthesis.getVoices()[0] // Seleciona a primeira voz disponível
    utterance.pitch = -2; // Ajusta o tom
    utterance.rate = 1; // Ajusta a velocidade
    speechSynthesis.onvoiceschanged = () => {
      alert("pronto para uso");
    };
  }
  
  speak(){
    speechSynthesis.speak(this.utterance);
  }
}
