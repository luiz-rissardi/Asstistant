import { AfterContentInit, Component, input, OnInit, Signal } from '@angular/core';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent implements OnInit{

  songData = input<any>();
  protected sourceVideo: string = "";

  ngOnInit(): void {
    this.sourceVideo = `https://www.youtube.com/embed/${this.songData().videoId}?autoplay=1`
  }
}
