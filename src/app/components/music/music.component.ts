import { AfterContentInit, AfterViewInit, Component, computed, effect, input, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent  {

  songData = input<any>();
  private player: any;
  private songIndexCurrent: number = 0;

  constructor(){
    effect(()=>{
      this.player.destroy()
      this.playVideo(this.songData().data[this.songIndexCurrent])
    })
  }

  ngAfterViewInit(): void {
    // Verifica se a API já foi carregada
    if ((window as any).YT) {
      this.playVideo(this.songData().data[this.songIndexCurrent])
    } else {
      // Cria um callback para inicializar o player quando a API carregar
      (window as any).onYouTubeIframeAPIReady = () => this.playVideo(this.songData().data[this.songIndexCurrent]);
    }
  }

  playVideo(songData:any) {
    this.player = new (window as any).YT.Player('player', {
      height: '350px',
      width: '300px',
      videoId: songData.videoId, // Substitua pelo ID do vídeo que você deseja exibir
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this)
      }
    });
  }

  private onPlayerError(event: any): void {
    this.songIndexCurrent++;
    this.player.loadVideoById(this.songData().data[this.songIndexCurrent]);
  }

  private onPlayerReady(event: any): void {
    // O player está pronto para ser usado
    event.target.playVideo();
  }

  private onPlayerStateChange(event: any): void {
    if (event.data === (window as any).YT.PlayerState.ENDED) {
      this.songIndexCurrent++;
      this.player.loadVideoById(this.songData().data[this.songIndexCurrent]);
    }
  }
}
