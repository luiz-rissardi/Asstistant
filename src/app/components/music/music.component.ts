import { AfterContentInit, Component, input, OnInit, signal, Signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent implements OnInit {

  songData = input<any>();
  protected sourceVideo = signal<SafeResourceUrl>("");

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const url = `https://www.youtube.com/embed/${this.songData()[0].videoId}?autoplay=1`;
    this.sourceVideo.set(this.sanitizer.bypassSecurityTrustResourceUrl(url))
  }
}
