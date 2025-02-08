import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy {
  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register("editClip");
    console.log(this.modal)
  }

  ngOnDestroy(): void {
    this.modal.unregister("editClip");
  }

}
