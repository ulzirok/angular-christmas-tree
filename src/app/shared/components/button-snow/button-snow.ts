import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-snow',
  imports: [],
  templateUrl: './button-snow.html',
  styleUrl: './button-snow.scss',
})
export class ButtonSnow {
  @Output() snowSwitched = new EventEmitter();
  @Input() isSnowing!: boolean | null;

  switchSnow(event: Event) {
    this.snowSwitched.emit(event);
  }
}
