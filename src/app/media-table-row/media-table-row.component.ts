import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-media-table-row]',
  templateUrl: './media-table-row.component.html'
})
export class MediaTableRowComponent{
  @Input() file: any;
}
