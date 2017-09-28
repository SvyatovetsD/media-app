import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FileService } from '../services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html'
})
export class FileViewerComponent implements OnChanges {
  @Input() id;
  private selectedFile: any = {};

  constructor(private service: FileService, private router: Router) { }

  ngOnChanges(){
    this.service.getFile(this.id)
    .subscribe(data=>{
      let file = data.json();
      if(file!==null)
        this.selectedFile = data.json();
      else
        this.router.navigate(['file-list/']);
    });
  }
}
