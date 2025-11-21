import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject } from '@angular/core';

@Component({
  selector: 'app-button-up',
  imports: [],
  templateUrl: './button-up.html',
  styleUrl: './button-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonUp {
  isVisible = false;
  private cdr = inject(ChangeDetectorRef)

  @HostListener('window:scroll') top() {
    if (window.scrollY > 300) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
    
    this.cdr.markForCheck()
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
