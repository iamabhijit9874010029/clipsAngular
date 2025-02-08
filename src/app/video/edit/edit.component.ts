import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy {
  constructor(private modal: ModalService) { }

  @Input() activeClip: IClip | null = null;

  ngOnInit(): void {
    this.modal.register("editClip");
    console.log(this.modal)
  }

  ngOnDestroy(): void {
    this.modal.unregister("editClip");
  }

}
