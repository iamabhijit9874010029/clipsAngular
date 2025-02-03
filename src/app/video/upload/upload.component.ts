import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  ShowAlert: boolean = false;
  alertColor: string = 'green';
  alertMsg: string = 'Please wait! Your clip is being uploaded.';
  inSubmission: boolean = false;

  constructor(private storage: AngularFireStorage) { }

  isDragOver = false;
  file: File | null = null;
  nextStep = false;

  // uploadForm: FormGroup = new FormGroup({
  //   title: new FormControl('', Validators.required)
  // });

  title: FormControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3),
    ],
    nonNullable: true
  })

  uploadForm: FormGroup = new FormGroup({
    title: this.title
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
    // this.uploadForm.patchValue({ title: this.file.name });

    // this.title.setValue(this.file.name.replace(".mp4", ""));
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ""));
  }

  // upload($event: Event) {
  //   $event.preventDefault();
  //   console.log("uploading...");
  //   console.log(this.uploadForm.value);
  // }

  // uploadFIle() {
  //   console.log("uploading...");
  //   const clipFileName = uuid();
  //   const clipPath = `clips/${clipFileName}.mp4`;
  //   this.storage.upload(clipPath, this.file);
  //   console.log(this.uploadForm.value);
  //   console.log("uploaded");
  // }

  async uploadFIle() {
    this.inSubmission = true;
    this.ShowAlert = true;
    console.log("uploading...");
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    await this.storage.upload(clipPath, this.file);
    console.log(this.uploadForm.value);
    console.log("uploaded");
    this.inSubmission = false;
    this.ShowAlert = false;
    
  }

  // async uploadFIle() {
  //   if (!this.file) {
  //     console.error("No file selected for upload.");
  //     return;
  //   }

  //   console.log("Uploading...");
  //   const clipFileName = uuid();
  //   const clipPath = `clips/${clipFileName}.mp4`;

  //   const uploadTask = this.storage.upload(clipPath, this.file);

  //   try {
  //     await uploadTask.snapshotChanges().toPromise();
  //     console.log("Upload successful", this.uploadForm.value);
  //   } catch (error) {
  //     console.error("Upload failed", error);
  //   }
  // }


}


// Your data location has been set in a region that does not support no-cost Storage buckets. Create or import a Cloud Storage bucket to get started.
// https://www.youtube.com/watch?v=aE5gAHOhIok