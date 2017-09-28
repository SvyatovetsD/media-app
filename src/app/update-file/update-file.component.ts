import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FileService } from '../services/file.service';
import { ProgressService } from '../services/progress.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-file',
  templateUrl: './update-file.component.html'
})
export class UpdateFileComponent implements OnInit {
  @Input() selectedFile: any;
  private error: any;
  private file: File;
  private filename: string = "";
  @Output() formCloseClicked: EventEmitter<any>;
  @Output() onFileUpdated: EventEmitter<any>;
  progress: any = {
    percentage: 0
  };

  private queryFileId: number;

  constructor(
    private http: Http,
    private fileService: FileService,
    private progressService: ProgressService,
    private router: Router,
    private route: ActivatedRoute
  ) 
  {
    this.formCloseClicked = new EventEmitter();
    this.onFileUpdated = new EventEmitter();
  }

  fileChange(event) {

    let fileList: FileList = event.target.files;  
    if (fileList.length > 0) 
    {  
      this.file = fileList[0];
      this.filename = this.file.name;
    }
  }  

  updateFile(){
    if(this.queryFileId===this.selectedFile.id)
      this.router.navigate(['/file-list']);

    this.error=null;
    if(this.file){
      let formData = new FormData();
      formData.set('file', this.file, this.filename);

      this.progressService.uploadProgress.subscribe(progress => 
        {this.progress = progress;
      });

      this.fileService.updateFile(this.selectedFile.id, formData)
      .subscribe(  
        (data) => {
          this.onFileUpdated.emit(data.json());
        },  
        (error: Response) => {
          this.error = error.json();
        });
    } else
    {
      this.fileService.updateFile(this.selectedFile.id, undefined, this.filename)
      .subscribe(  
        (data) => {
          this.onFileUpdated.emit(data.json());
        },  
        (error: Response) => {
          this.error = error.json();
        });
    }
  }

  closeForm(){
    this.formCloseClicked.emit();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params =>{
      this.queryFileId = +params.get('file');
    });

    this.filename = this.selectedFile.filename;
  }

}
