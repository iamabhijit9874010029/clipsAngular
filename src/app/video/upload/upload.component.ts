import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { last, of, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase/compat/app';
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnDestroy {

  ShowAlert: boolean = false;
  alertColor: string = 'blue';
  alertMsg: string = 'Please wait! Your clip is being uploaded.';
  inSubmission: boolean = false;
  percentage: number = 0;
  showPercentage: boolean = false;
  fullSize: number = 0;
  uploadedSize: number = 0;
  user: firebase.User | null = null;
  task?: AngularFireUploadTask;

  constructor(private storage: AngularFireStorage, private auth: AngularFireAuth, private clipService: ClipService, private roter: Router) {
    auth.user.subscribe(user => this.user = user);
  }
  ngOnDestroy(): void {
    this.task?.cancel();
  }

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
    this.file = ($event as DragEvent).dataTransfer ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if (!this.file || this.file.type !== "video/mp4") {
      console.log("error - the MIME type or subtype of the file is : ", this.file?.type);
      return;
    }

    // console.log(this.file);
    // console.log("success - the MIME type or subtype of the file is : ", this.file.type);

    this.nextStep = true;
    // this.uploadForm.patchValue({ title: this.file.name });

    // this.title.setValue(this.file.name.replace(".mp4", ""));
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ""));
  }

  uploadFIle() {
    this.uploadForm.disable();
    this.inSubmission = true;
    this.alertMsg = 'Please wait! Your clip is being uploaded.';
    this.ShowAlert = true;
    this.alertColor = 'blue';
    this.showPercentage = true;

    console.log("uploading...");

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    this.task = this.storage.upload(clipPath, this.file);

    const clipRef = this.storage.ref(clipPath);

    this.task.percentageChanges().subscribe((progress) => {
      this.percentage = progress as number / 100;
    });

    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL()),
    ).subscribe({
      next: async (url) => {
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url
        }

        const clipDocRef = await this.clipService.createClip(clip);

        this.alertColor = 'green';
        this.alertMsg = 'Success! Your clips is now ready to share with the world!';
        this.showPercentage = false;

        // console.log(this.uploadForm.value ?? null);
        console.log("uploaded");
        // console.log(url);
        console.log(clip);

        setTimeout(() => {
          this.roter.navigate(['clip', clipDocRef.id]);
        }, 1000)
      },
      error: (error) => {
        this.alertColor = 'red';
        this.alertMsg = 'Upload failed! Please try again later.';
        this.inSubmission = true;
        this.showPercentage = false;
        console.log(error);
        this.uploadForm.enable();
      }
    }
    );

    // task.snapshotChanges().subscribe({
    //   next: (snap) => {
    //     this.fullSize = snap?.totalBytes ?? 0;
    //     this.uploadedSize = snap?.bytesTransferred ?? 0;
    //   },
    //   complete() {
    //     console.log("uploaded");
    //   },
    // });
  }
}


// Your data location has been set in a region that does not support no-cost Storage buckets. Create or import a Cloud Storage bucket to get started.
// https://www.youtube.com/watch?v=aE5gAHOhIok