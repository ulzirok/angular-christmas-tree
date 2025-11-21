import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Search {
  @Output() valueChanged = new EventEmitter();

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.valueChanged.emit(inputValue);
  }
}
