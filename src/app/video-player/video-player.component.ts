import { Component, OnInit, Input } from '@angular/core';
import { FileService } from '../services/file.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements OnInit {
  @Input() file: any;
  videoUrl: string;

  constructor(private service: FileService, private router: Router) {
  }

  ngOnInit() {
    this.videoUrl = this.service.fileUrl + this.file.path;
  }

  closeForm(){
    this.router.navigate(['/file-list']);
  }

}
