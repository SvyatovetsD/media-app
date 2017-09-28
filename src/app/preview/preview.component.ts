import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { FileService } from '../services/file.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html'
})
export class PreviewComponent implements OnChanges {
  @Input() private file: any;
  @Output() onFileDeleted: EventEmitter<any> = new EventEmitter();

  private queryFileId: number;

  private fullPath: string;
  private updateVisible: boolean = false;
  
  constructor(
    private service: FileService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.file){
      if(this.file.type==='Audio')
        this.fullPath = 'assets/music-icon.png'
      else
        this.fullPath = this.service.fileUrl + this.file.thumbnail;
    }

    this.route.queryParamMap.subscribe(params =>{
      this.queryFileId = +params.get('file');
    });
  }

  updateFile(){
    this.updateVisible=true;
  }

  hideUpdater(){
    this.updateVisible=false;
  }

  fileWasUpdated(file){
    this.hideUpdater();
    this.file = file;
  }

  deleteFile(){
    if(this.queryFileId===this.file.id)
    this.router.navigate(['file-list/']);

    this.service.deleteFile(this.file.id).subscribe(
      responce=>{
        this.onFileDeleted.emit();
      });
  }

  openFile(){
    this.router.navigate(['/file-list'], { queryParams: { file: this.file.id } });
  }

}
