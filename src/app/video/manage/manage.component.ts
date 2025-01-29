import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})

export class ManageComponent implements OnInit {
  videoOrder: string = "1";

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //this will keep the state maintained on page refresh
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === "2" ? params['sort'] : "1";
    });
    // console.log(this.videoOrder);
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
