import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-reset',
  imports: [],
  templateUrl: './button-reset.html',
  styleUrl: './button-reset.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonReset {
  @Output() filtersResetted = new EventEmitter();

  resetFilters(event: Event) {
    this.filtersResetted.emit(event);
  }
}
