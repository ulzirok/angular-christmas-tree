import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-button-up',
  imports: [],
  templateUrl: './button-up.html',
  styleUrl: './button-up.scss',
})
export class ButtonUp {
  isVisible = false;

  @HostListener('window:scroll') top() {
    if (window.scrollY > 300) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
