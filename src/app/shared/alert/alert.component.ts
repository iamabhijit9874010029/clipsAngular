import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() color = "blue";
  get bgColor() {
    return `bg-${this.color}-400`;
  }
}
