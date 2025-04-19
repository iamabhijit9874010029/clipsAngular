import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';
// import Player from 'video.js/dist/types/player';


@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class ClipComponent implements OnInit {
  clip?: IClip;
  @ViewChild("videoPlayer", { static: true }) target?: ElementRef;
  // player?: videojs.Player; //will not work in latest versions
  player?: ReturnType<typeof videojs>; // ✅ clean and future-proof
  // player?: Player; //separate import from player for type checking

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);
    // this.id = route.snapshot.params['id'];

    this.route.data.subscribe(data=>{
      this.clip = data['clip'] as IClip;

      this.player?.src({
        src: this.clip.url,
        type: 'video/mp4'
      })
    })

    // console.log(route.snapshot);
  }
}
