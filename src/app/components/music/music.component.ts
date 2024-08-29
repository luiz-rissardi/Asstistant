import { AfterContentInit, Component, computed, effect, input, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent {

  songData = input<any>();
  protected sourceVideo: Signal<SafeResourceUrl>;

  constructor(private sanitizer: DomSanitizer) {
    this.sourceVideo = computed(() => {
      const url = `https://www.youtube.com/embed/${this.songData().data[0].videoId}?autoplay=1`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }
}
