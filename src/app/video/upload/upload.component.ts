import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  isDragOver = false;
  file: File | null = null;
  nextStep = false;

  uploadForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  storeFile($event: Event) {
    this.isDragOver = false;

    // console.log(($event as DragEvent).dataTransfer?.files);
    // this.file = ($event as DragEvent).dataTransfer?.files[0] ?? null;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;

    if (!this.file || this.file.type !== "video/mp4") {
      console.log("error - the MIME type or subtype of the file is : ", this.file?.type);
      return;
    }

    console.log(this.file);
    console.log("succes - the MIME type or subtype of the file is : ", this.file.type);

    this.nextStep = true;
    this.uploadForm.patchValue({ title: this.file.name });
  }

  upload($event: Event) {
    $event.preventDefault();
    console.log("uploading...");
    console.log(this.uploadForm.value);
  }
}
