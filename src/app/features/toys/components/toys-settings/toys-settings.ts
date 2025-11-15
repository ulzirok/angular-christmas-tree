import { Component, inject } from '@angular/core';
import { Search } from '../search/search';
import { ButtonVolume } from '../../../../shared/components/button-volume/button-volume';
import { ButtonSnow } from '../../../../shared/components/button-snow/button-snow';
import { ButtonReset } from '../../../../shared/components/button-reset/button-reset';
import { FormsModule } from '@angular/forms';
import { ToysService } from '../../services/toys-service';

@Component({
  selector: 'app-toys-settings',
  imports: [Search, ButtonVolume, ButtonSnow, ButtonReset, FormsModule],
  templateUrl: './toys-settings.html',
  styleUrl: './toys-settings.scss',
})
export class ToysSettings {
  private toyService = inject(ToysService)
  
  onInputValueChanged(inputValue: string) { //Поиск
    this.toyService.searchToys(inputValue)
  }
  
  onSelectValueChanged(event: Event) {
    const valueSelect = (event.target as HTMLSelectElement).value
    console.log(valueSelect);
    
  }
}
