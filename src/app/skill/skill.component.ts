import { Component, OnInit } from '@angular/core';
import { SkillService } from './skill.service';
import { Skill } from './model/Skill';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorState } from 'primeng/paginator';
import { Pageable } from '../core/model/page/Pageable';


@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [TableModule,ButtonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
})
export class SkillComponent implements OnInit {
  constructor(private skillService: SkillService) {}

  pageNumber: number = 0;
  pageSize: number = 10;
  skills: Skill[] = [];
  totalElements: number = 0;

  ngOnInit(): void {

    //Load the first page
    this.onPageChange({first: 0, rows:5})
  }

  onPageChange(event?: TablePageEvent) {

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


    this.skillService
      .getSkillsPage(pageable,)
      .subscribe((data) => {
        this.skills = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
      });


  }
  
}
