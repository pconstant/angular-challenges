import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { ListItemDirective } from '../list-item/list-item.directive';

@Component({
  selector: 'app-card',
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
    '[class]': 'customClass',
  },
  template: `
    <ng-content select="img"></ng-content>
    <section>
      @for (item of list(); track item.id) {
        <ng-template
          [ngTemplateOutlet]="listItemTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addItem.emit()">
      Add
    </button>
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  list = input.required<T[] | null>();
  customClass = input<string>('');
  addItem = output<void>();

  @ContentChild(ListItemDirective, { read: TemplateRef })
  listItemTemplate: TemplateRef<{ $implicit: T }> | undefined;
}
