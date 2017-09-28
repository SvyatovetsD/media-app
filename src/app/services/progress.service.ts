import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class ProgressService {
  uploadProgress: Subject<any> = new Subject();

}

@Injectable()
export class BrowserXhrWithProgress extends BrowserXhr {

  constructor(private service: ProgressService){
    super();
  }

  build(): XMLHttpRequest{
    var xhr: XMLHttpRequest = super.build();

    xhr.upload.onprogress = (event) => {
      this.service.uploadProgress.next({
        total: event.total,
        percentage: Math.round(event.loaded / event.total * 100)
      });
    }

    return xhr;
  }

}