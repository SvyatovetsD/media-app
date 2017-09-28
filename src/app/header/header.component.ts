import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{
  private uploaderVisible = false;
  private filter: string = "";

  @Output() reloadListClicked: EventEmitter<any>;
  @Output() onFindBtnClicked: EventEmitter<string>;

  constructor()
  {
    this.reloadListClicked = new EventEmitter();
    this.onFindBtnClicked = new EventEmitter();
  }

  findBtnClick(){
    this.onFindBtnClicked.emit(this.filter);
  }

  openUploader(){
    this.uploaderVisible = true;
  }

  closeUploader(){
    this.uploaderVisible = false;
  }

  reloadList(){
    this.reloadListClicked.emit();
  }
}
