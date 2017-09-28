import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FileService {
  public fileUrl = "http://localhost:51359";
  private url = "http://localhost:51359/api/File"

  constructor(private http: Http) { }

  getFiles(query){
    return this.http.get(this.url + '?' + this.toQueryString(query));
  }

  getFile(id: number){
    return this.http.get(this.url + '/' + id);
  }

  private toQueryString(obj){
    var parts = [];

    for (var property in obj){
      var value = obj[property];
      if(value != null && value != undefined)
        parts.push(encodeURIComponent(property)+ '=' + encodeURIComponent(value));
    };

    return parts.join('&');
  }

  postFile(formData: FormData){    
    return this.http.post(this.url, formData)  
      .map(res => res.json())  
      .catch(error => Observable.throw(error));
  }

  deleteFile(id: number){
    return this.http.delete(this.url + '/' + id);
  }

  updateFile(id: number, formData?: FormData, newName?: string){
    return this.http.put(this.url + '/' + id + '?newname='+ newName,formData);
  }
}
