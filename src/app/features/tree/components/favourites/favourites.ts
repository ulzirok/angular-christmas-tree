import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit } from '@angular/core';
import { StateService } from '../../../../state-service';
import { ToysService } from '../../../toys/services/toys-service';
import { Observable } from 'rxjs';
import { IToy } from '../../../toys/models/toy-model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-favourites',
  imports: [AsyncPipe],
  templateUrl: './favourites.html',
  styleUrl: './favourites.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Favourites implements OnInit {
  private stateService = inject(StateService);
  private toysService = inject(ToysService);
  toys$!: Observable<IToy[]>;

  private dragElem: HTMLImageElement | null = null;

  ngOnInit(): void {
    this.toysService.getToys();
    this.toys$ = this.stateService.filteredToys$;
  }

  startDrag(toy: IToy, e: PointerEvent) {
    e.preventDefault();

    // создаём копию игрушки
    const img = document.createElement('img');
    img.src = `assets/images/toys/${toy.num}.png`;
    img.style.position = 'fixed';
    img.style.width = '50px';
    img.style.height = '50px';
    img.style.pointerEvents = 'none';
    img.style.top = e.clientY - 25 + 'px';
    img.style.left = e.clientX - 25 + 'px';
    img.style.zIndex = '9999';

    document.body.appendChild(img);
    this.dragElem = img;

    // обработчик движения
    const moveHandler = (event: PointerEvent) => {
      event.preventDefault();
      if (!this.dragElem) return;

      this.dragElem.style.top = event.clientY - 25 + 'px';
      this.dragElem.style.left = event.clientX - 25 + 'px';
    };

    // обработчик отпускания
    const upHandler = (event: PointerEvent) => {
      document.addEventListener('pointermove', moveHandler, { passive: false });
      document.removeEventListener('pointerup', upHandler);

      if (!this.dragElem) return;

      const treeImg = document.querySelector('.christmas-tree') as HTMLElement;
      const toyLayer = document.querySelector('.tree-toys') as HTMLElement;

      const treeRect = treeImg.getBoundingClientRect();
      const layerRect = toyLayer.getBoundingClientRect();

      // проверка попадания в область картинки ёлки
      if (
        event.clientX >= treeRect.left &&
        event.clientX <= treeRect.right &&
        event.clientY >= treeRect.top &&
        event.clientY <= treeRect.bottom
      ) {
        const newToy = document.createElement('img');
        newToy.src = this.dragElem.src;
        newToy.style.position = 'absolute';
        newToy.style.width = '50px';
        newToy.style.height = '50px';

        // координаты относительно toyLayer, а не всей страницы
        newToy.style.left = event.clientX - layerRect.left - 25 + 'px';
        newToy.style.top = event.clientY - layerRect.top - 25 + 'px';

        toyLayer.appendChild(newToy);

        newToy.style.pointerEvents = 'auto';
        newToy.addEventListener('pointerdown', (ev) => {
          ev.stopPropagation();
          this.startReDrag(newToy, ev);      //повторный drag
        });

      }

      // удаляем летающую игрушку
      this.dragElem.remove();
      this.dragElem = null;

    };

    document.addEventListener('pointermove', moveHandler);
    document.addEventListener('pointerup', upHandler);
  }

  startReDrag(img: HTMLImageElement, e: PointerEvent) {
    e.preventDefault();

    const toyLayer = document.querySelector('.tree-toys') as HTMLElement;
    const layerRect = toyLayer.getBoundingClientRect();

    const shiftX = e.clientX - img.getBoundingClientRect().left;
    const shiftY = e.clientY - img.getBoundingClientRect().top;

    this.dragElem = img;

    const moveHandler = (event: PointerEvent) => {
      if (!this.dragElem) return;

      this.dragElem.style.left = event.clientX - layerRect.left - shiftX + 'px';
      this.dragElem.style.top = event.clientY - layerRect.top - shiftY + 'px';
    };

    const upHandler = () => {
      document.removeEventListener('pointermove', moveHandler);
      document.removeEventListener('pointerup', upHandler);
      this.dragElem = null;
    };

    document.addEventListener('pointermove', moveHandler);
    document.addEventListener('pointerup', upHandler);
  }

}
