import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-media-table',
  templateUrl: './media-table.component.html'
})
export class MediaTableComponent implements OnInit {
  isServerDown: boolean;

  private fileId;

  private files: any[];
  private selectedFile: any;
  private queryObj: any = {};
  private columns = [
    {title: 'Имя', key: 'filename'},
    {title: 'Длительность', key: 'duration'},
    {title: 'Тип', key: 'type'},
  ];
  private totalItems: number;
  private pageSize: number = 15;

  constructor(
    private fileService: FileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params =>{
      this.fileId = params.get('file');
    })

    this.cancelPagination();
    this.loadFiles();
  }

  cancelPagination(){
    this.queryObj.Page = 1;
    this.queryObj.PageSize = this.pageSize;
  }

  setFilter(filter: string){
    this.cancelPagination();

    this.queryObj.filename = filter;
    this.loadFiles();
  }

  sortBy(columnName: string){
    this.cancelPagination();

    if(this.queryObj.sortBy===columnName){
      this.queryObj.isSortAscending = !this.queryObj.isSortAscending;
    } else {
      this.queryObj.sortBy = columnName;
      this.queryObj.isSortAscending = true;
    }

    this.loadFiles();
  }

  changePage(page){
    this.queryObj.Page = page;
    this.loadFiles();
  }

  updateList(){
    this.queryObj = {};
    this.cancelPagination();
    
    this.loadFiles();
  }

  loadFiles(){
    this.fileService.getFiles(this.queryObj).subscribe(responce=>{
      this.files = responce.json().items;
      this.totalItems = responce.json().totalItems;
    },
    (error: Response) =>{
      this.isServerDown = true;
    });
  }

  fileSelected(file: any){
    this.selectedFile = file;
  }

  fileWasDeleted(){
    this.selectedFile = null;
    this.loadFiles();
  }
}
