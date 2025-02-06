import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})

export class ManageComponent implements OnInit {
  videoOrder: string = "1";

  constructor(private router: Router, private route: ActivatedRoute, private clipService: ClipService) { }

  ngOnInit() {
    //this will keep the state maintained on page refresh
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === "2" ? params['sort'] : "1";
    });
    // console.log(this.videoOrder);
    this.clipService.getUserClips().subscribe(console.log);
  }

  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement);
    // this.router.navigateByUrl(`/manage?sort=${value}`);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    })
    //this will not keep the state maintained on page refresh
    // this.videoOrder = value;
  }
}
