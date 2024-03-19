import { Pageable } from './../core/model/page/Pageable';
import { Component, OnInit } from '@angular/core';
import { SkillService } from './skill.service';
import { ButtonModule } from 'primeng/button';
import { SkillEditComponent } from './skill-edit/skill-edit.component';
import { TableComponent } from '../components/table/table.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [ButtonModule, SkillEditComponent, TableComponent,ToastModule],
  providers: [SnackbarService,MessageService],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
})
export class SkillComponent implements OnInit {
  getServicePage: any;
  tableColumns: string[] = ['id', 'group', 'label'];
  data: any[] = [];
  totalElements: number = 0;

  constructor(
    public skillService: SkillService,
    private snackbarService: SnackbarService
  ) {
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

  onPageChange(pageable: Pageable) {
    this.getData(pageable);
  }

  getData(pageable: Pageable) {
    this.skillService.getSkillsPage(pageable).subscribe({
      next: (data: any) => {
        this.data = data.content;
        this.totalElements = data.totalElements;
      },
      error: () => {
        this.data = [];

        this.snackbarService.error(
          'Error al obtener los datos. Por favor, inténtelo de nuevo.'
        );
      },
    });
  }
}
