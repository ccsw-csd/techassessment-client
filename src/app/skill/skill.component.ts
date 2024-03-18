import { Pageable } from './../core/model/page/Pageable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SkillService } from './skill.service';
import { ButtonModule } from 'primeng/button';
import { SkillEditComponent } from './skill-edit/skill-edit.component';
import { TableComponent } from '../components/table/table.component';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [ButtonModule, SkillEditComponent, TableComponent],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
})
export class SkillComponent implements OnInit {
  getServicePage: any;
  tableColumns: string[] = ['id', 'group', 'label'];
  data: any[] = [];
  totalElements: number = 0;

  constructor(public skillService: SkillService) {
    this.getServicePage = skillService.getSkillsPage.bind(skillService);
  }

  ngOnInit(): void {
    this.getData({
      pageNumber: 0,
      pageSize: 10,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    });
  }

  onPageRetrieved(pageable: Pageable) {
    this.getData(pageable);
  }

  getData(pageable: Pageable) {
    this.skillService.getSkillsPage(pageable).subscribe((data: any) => {
      this.data = data.content;
      this.totalElements = data.totalElements;
    });
  }
}
