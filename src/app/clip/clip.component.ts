import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
// import Player from 'video.js/dist/types/player';


@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css'
})
export class ClipComponent implements OnInit {
  id = "";
  @ViewChild("videoPlayer", { static: true }) target?: ElementRef;
  // player?: videojs.Player; //will not work in latest versions
  player?: ReturnType<typeof videojs>; // ✅ clean and future-proof
  // player?: Player; //separate import from player for type checking

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);
    // this.id = route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })

    // console.log(route.snapshot);
  }
}
