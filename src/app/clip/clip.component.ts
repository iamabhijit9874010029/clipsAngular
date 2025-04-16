import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css'
})
export class ClipComponent {
  id = "";
  @ViewChild("videoPlayer", { static: true }) target?: ElementRef;

  constructor(route: ActivatedRoute) {
    // this.id = route.snapshot.params['id'];
    route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })

    // console.log(route.snapshot);
  }
}
