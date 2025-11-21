import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-volume',
  imports: [],
  templateUrl: './button-volume.html',
  styleUrl: './button-volume.scss',
})
export class ButtonVolume {
  @Output() audioSwitched = new EventEmitter();
  @Input() isAudioOn!: boolean | null;

  switchAudio(event: Event) {
    this.audioSwitched.emit(event);
  }
}
