import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class TableComponent {
  @Input() columns: string[] = []
  @Input() data: any[] = [];
  @Input() totalElements: number = 0;
  @Output() pageRetrieved = new EventEmitter<Pageable>();
  
  pageNumber: number = 5;
  pageSize: number = 10;


  changePage(event:any){
    
    const pageable: Pageable = {
      pageNumber: event.page,
      pageSize: event.rows,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    this.pageRetrieved.emit(pageable);
  }
  

}
