import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Pageable } from '../../core/model/page/Pageable';
import { SortPage } from 'src/app/core/models/SortPage';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [TableModule, PaginatorModule],
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() totalElements: number = 0;
  @Output() pageChangeEvent = new EventEmitter<Pageable>();

  pageNumber: number = 5;
  pageSize: number = 10;

  sort = {
    property: 'id',
    direction: "ASC",
  }


  customSort(event) {
    const direction = event.order === 1 ? "ASC" : "DESC";

    // Same sort, do nothing
    if(event.field === this.sort.property && direction === this.sort.direction) return


    this.sort = {
      property: event.field,
      direction:direction,
    }

    this.changePage({page:0,rows:10});
  }

  changePage(event: any) {
    this.pageNumber = event.page;
    this.pageSize = event.rows;

    console.log("CHANGE PAGE",event);

    const pageable: Pageable = {
      pageNumber: event.page,
      pageSize: event.rows,
      sort: [this.sort]
    };

    this.pageChangeEvent.emit(pageable);
  }
}
