import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  isDragOver = false;
  file: File | null = null;

  storeFile($event: Event) {
    this.isDragOver = false;

    // console.log(($event as DragEvent).dataTransfer?.files);
    // this.file = ($event as DragEvent).dataTransfer?.files[0] ?? null;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;

    if (!this.file || this.file.type !== "video/mp4") {
      console.log("the MIME type or subtype of the file is : ", this.file?.type);
      return;
    }

    console.log(this.file);
    console.log("the MIME type or subtype of the file is : ", this.file.type);
  }
}
