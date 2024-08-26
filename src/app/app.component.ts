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

  constructor() {
    afterNextRender(() => {
      const recognition = new window["webkitSpeechRecognition"]();
      recognition.continuous = true; // Continua reconhecendo mesmo após uma pausa
      recognition.interimResults = true; // Mostra resultados intermediários
      recognition.lang = 'pt-BR'; // Define o idioma para Português Brasileiro

      recognition.start();
      recognition.onresult = (event) => {
        let finalTranscript = '';
        console.log(event);
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
            console.log('Texto final:', finalTranscript); // Log do texto final
          }
        }
      };

      setTimeout(() => {
        recognition.stop()
      }, 3000);
    });
  }
}
