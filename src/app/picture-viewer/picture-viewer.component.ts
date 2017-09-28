import { Component, OnInit, Input} from '@angular/core';
import { FileService } from '../services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-picture-viewer',
  templateUrl: './picture-viewer.component.html'
})
export class PictureViewerComponent implements OnInit {
  @Input() picture: any;
  private picUrl;

  constructor(private service: FileService, private router: Router) {
  }

  ngOnInit() {
    this.picUrl = this.service.fileUrl + this.picture.path;
  }

  closeForm(){
    this.router.navigate(['/file-list']);
  }
}
