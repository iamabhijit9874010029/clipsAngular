import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  ShowAlert: boolean = false;
  alertColor: string = 'blue';
  alertMsg: string = 'Please wait! Your clip is being uploaded.';
  inSubmission: boolean = false;
  percentage: number = 0;
  showPercentage: boolean = false;

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
    console.log("success - the MIME type or subtype of the file is : ", this.file.type);

    this.nextStep = true;
    // this.uploadForm.patchValue({ title: this.file.name });

    // this.title.setValue(this.file.name.replace(".mp4", ""));
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ""));
  }

  uploadFIle() {
    this.inSubmission = true;
    this.alertMsg = 'Please wait! Your clip is being uploaded.';
    this.ShowAlert = true;
    this.alertColor = 'blue';
    this.showPercentage = true;

    console.log("uploading...");

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    const task = this.storage.upload(clipPath, this.file);

    task.percentageChanges().subscribe((progress) => {
      this.percentage = progress as number / 100;
    });

    task.snapshotChanges().pipe(
      last()
    ).subscribe({
      next: (snapshot) => {
        this.alertColor = 'green';
        this.alertMsg = 'Success! Your clips is now ready to share with the world!';
        this.showPercentage = false;

        console.log(this.uploadForm.value ?? null);
        console.log("uploaded");
      },
      error: (error) => {
        this.alertColor = 'red';
        this.alertMsg = 'Upload failed! Please try again later.';
        this.inSubmission = true;
        this.showPercentage = false;
        console.log(error);
      }
    }
    );



  }
}


// Your data location has been set in a region that does not support no-cost Storage buckets. Create or import a Cloud Storage bucket to get started.
// https://www.youtube.com/watch?v=aE5gAHOhIok