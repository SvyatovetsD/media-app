import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges {
	@Input('total-items') totalItems;
	@Input('page-size') pageSize;
	@Output('page-changed') pageChanged = new EventEmitter();
	pages: any[];
	@Input() currentPage; 

	ngOnChanges(){        
		var pagesCount = Math.ceil(this.totalItems / this.pageSize); 
		this.pages = [];
		for (var i = 1; i <= pagesCount; i++)
    		this.pages.push(i);
	}

	changePage(page){
		this.currentPage = page; 
		this.pageChanged.emit(page);
	}

	previous(){
		if (this.currentPage == 1)
			return;

		this.currentPage--;
		this.pageChanged.emit(this.currentPage);
	}

	next(){
		if (this.currentPage == this.pages.length)
			return; 
		
		this.currentPage++;
		this.pageChanged.emit(this.currentPage);
	}
}