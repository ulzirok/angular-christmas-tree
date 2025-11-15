import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToysService } from '../../services/toys-service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  @Output() valueChanged = new EventEmitter()
  
  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value
    this.valueChanged.emit(inputValue)
  }
}
