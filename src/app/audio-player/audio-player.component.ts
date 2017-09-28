import { Component, OnInit, Input, OnChanges, SimpleChange} from '@angular/core';
import { FileService } from '../services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent implements OnInit, OnChanges {
  @Input() file: any;
  private path;
  private showPlayer;

  constructor(private service: FileService, private router: Router) {
  }

  ngOnInit() {
    this.path = this.service.fileUrl + this.file.path;
  }

  close(){
    this.router.navigate(['/file-list']);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    if(changes['file'].previousValue !== changes['file'].currentValue && changes['file'].currentValue !== '') {
      this.showPlayer = false;
      this.path = this.service.fileUrl + this.file.path;
      setTimeout(() => this.showPlayer = true, 0);
    }
  }
}
