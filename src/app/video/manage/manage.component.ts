import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})

export class ManageComponent implements OnInit {
  videoOrder: string = "1";
  clips: IClip[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private clipService: ClipService, private modal: ModalService) { }

  ngOnInit() {
    //this will keep the state maintained on page refresh
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === "2" ? params['sort'] : "1";
    });
    // console.log(this.videoOrder);
    this.clipService.getUserClips().subscribe(
      doc => {
        this.clips = [];

        doc.forEach(doc => {
          this.clips.push({
            docID: doc.id,
            ...doc.data()
          })
        })
      });
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

  openModal(event: Event, clip: IClip) {
    event.preventDefault();
    this.modal.toggleModal("editClip");
  }
}
