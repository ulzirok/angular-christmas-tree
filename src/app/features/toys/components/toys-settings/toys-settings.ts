import { Component } from '@angular/core';
import { Search } from '../search/search';
import { ButtonVolume } from '../../../../shared/components/button-volume/button-volume';
import { ButtonSnow } from '../../../../shared/components/button-snow/button-snow';
import { ButtonReset } from '../../../../shared/components/button-reset/button-reset';

@Component({
  selector: 'app-toys-settings',
  imports: [Search, ButtonVolume, ButtonSnow, ButtonReset],
  templateUrl: './toys-settings.html',
  styleUrl: './toys-settings.scss',
})
export class ToysSettings {}
