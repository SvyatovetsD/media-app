import { Component, Output, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';  
import { Observable } from 'rxjs/Rx';  
import { FileService } from '../services/file.service';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html'
})
export class UploadFileComponent {
  private error: string;
  private file: File;
  private filename: string = "";
  @Output() formCloseClicked: EventEmitter<any>;
  progress: any = {
    percentage: 0
  };

  constructor(
    private http: Http,
    private fileService: FileService,
    private progressService: ProgressService
  ) 
  {
    this.formCloseClicked = new EventEmitter();
  }

  fileChange(event) {

    let fileList: FileList = event.target.files;  
    if (fileList.length > 0) 
    {  
      this.file = fileList[0];
      this.filename = this.file.name;
    }
  }  

  uploadFile(){
    this.error = null;
    let formData = new FormData();
    formData.set('file', this.file, this.filename);

    this.progressService.uploadProgress.subscribe(progress => 
      {console.log(progress)
      this.progress = progress;
    });
    
    this.fileService.postFile(formData)
    .subscribe(  
      data => console.log('success'),  
      (error: Response) => {
        this.error = error.json();
      });
  }

  closeForm(){
    this.formCloseClicked.emit();
  }
}
