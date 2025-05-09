import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  activeClip: IClip | null = null;
  sort$: BehaviorSubject<string>;

  constructor(private router: Router, private route: ActivatedRoute, private clipService: ClipService, private modal: ModalService) {
    this.sort$ = new BehaviorSubject<string>(this.videoOrder);
  }

  ngOnInit() {
    //this will keep the state maintained on page refresh
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === "2" ? params['sort'] : "1";
      this.sort$.next(this.videoOrder);
    });
    // console.log(this.videoOrder);
    this.clipService.getUserClips(this.sort$).subscribe(
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
    this.activeClip = clip;
    this.modal.toggleModal("editClip");
  }

  update($event: IClip) {
    this.clips.forEach((element, index) => {
      if (element.docID === $event.docID) {
        this.clips[index].title = $event.title;
      }
    });
  }

  delete($event: Event, clip: IClip) {
    $event.preventDefault();

    this.clipService.deleteClip(clip);

    this.clips.forEach((element, index) => {
      if (element.docID === clip.docID) {
        this.clips.splice(index, 1);
      }
    });
  }

  async copyToClipboard($event: MouseEvent, docID: string | undefined) {
    $event.preventDefault();

    if (!docID) {
      return;
    }

    const url = `${location.origin}/clip/${docID}`;

    await navigator.clipboard.writeText(url);

    alert("Link copied to clipboard!");
  }
}
