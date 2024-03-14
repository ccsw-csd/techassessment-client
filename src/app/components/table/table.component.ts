import { Component, Input, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Pageable } from '../../core/model/page/Pageable';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [TableModule,PaginatorModule],
})
export class TableComponent implements OnInit {
  @Input() service: any
  @Input() columns: string[] = []
  @Input() getPage: any

	
  totalElements: number = 0;
  pageNumber: number = 0;
  pageSize: number = 10;
  data: any[] = [];


  ngOnInit(): void {
	this.onPageChange({first: 0, rows:5})
  }

  onPageChange(event?: any) {

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

     if (event != null) {
      pageable.pageSize = event.rows;
      pageable.pageNumber = event.first / event.rows;
    }


    this.getPage(pageable,)
      .subscribe((data:any) => {
        this.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
      });

  }
}
