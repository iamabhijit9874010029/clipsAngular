import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css'
})
export class ClipComponent {
  id = "";
  constructor(route: ActivatedRoute) {
    // this.id = route.snapshot.params['id'];
    route.params.subscribe((params: Params)=>{
      this.id = params['id'];
    })

    // console.log(route.snapshot);
  }
}
