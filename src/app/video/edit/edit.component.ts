import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  ShowAlert: boolean = false;
  alertColor: string = "blue";
  alertMsg: string = "Please wait! Updating clip.";
  inSubmission: boolean = false;

  constructor(private modal: ModalService, private clipService: ClipService) { }

  @Input() activeClip: IClip | null = null;
  @Output() update = new EventEmitter();

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

    // this.inSubmission = false;
    this.ShowAlert = false
    this.clipID.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);
  }

  async submit() {
    if (!this.activeClip) {
      return
    }
    this.ShowAlert = true;
    this.alertColor = "blue";
    this.alertMsg = "Please wait! Updating clip.";
    this.inSubmission = true;

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value);
      // await new Promise(resolve => setTimeout(resolve, 5000));
      // alert("to check whether 'Please wait! Updating clip.' is actually poping up very fast");
    }
    catch (error) {
      this.alertColor = "red";
      this.alertMsg = "Something went wrong. Try again later!";
      this.inSubmission = false;
      return
    }

    this.alertColor = "green";
    this.alertMsg = "Success!";
    this.inSubmission = false;

    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);
  }
}
