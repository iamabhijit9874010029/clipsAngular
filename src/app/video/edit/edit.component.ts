import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private modal: ModalService) { }

  @Input() activeClip: IClip | null = null;

  clipID: FormControl = new FormControl("", { nonNullable: true });
  title: FormControl = new FormControl("", {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true
  })

  editForm: FormGroup = new FormGroup({
    title: this.title,
    id: this.clipID
  })

  ngOnInit(): void {
    this.modal.register("editClip");
  }

  ngOnDestroy(): void {
    this.modal.unregister("editClip");
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }

    this.clipID.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);
  }

}
