import { Pageable } from './../core/model/page/Pageable';
import { Component, OnInit } from '@angular/core';
import { SkillService } from './skill.service';
import { ButtonModule } from 'primeng/button';
import { SkillEditComponent } from './skill-edit/skill-edit.component';
import { TableComponent } from '../components/table/table.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoadingService } from 'src/app/loading/services/loading.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [
    ButtonModule,
    SkillEditComponent,
    TableComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    SnackbarService,
    MessageService,
    DialogService,
    ConfirmationService,
  ],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
})
export class SkillComponent implements OnInit {
  tableColumns: string[] = ['id', 'group', 'label'];
  data: any[] = [];
  totalElements: number = 0;
  ref: DynamicDialogRef;

  constructor(
    public skillService: SkillService,
    public dialogService: DialogService,
    private snackbarService: SnackbarService,
    private loadingService: LoadingService,
    private confirmationService: ConfirmationService
  ) {}

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

  showDialog(item: any) {
    this.ref = this.dialogService.open(SkillEditComponent, {
      header: item ? 'Editar habilidad' : 'Crear habilidad',
      width: 'fit-content',
      data: item,
    });

    this.ref.onClose.subscribe((result) => {
      if (!result) return;

      if (result === 'update')
        this.snackbarService.showMessage('Skill actualizado correctamente');

      if (result === 'create')
        this.snackbarService.showMessage('Skill creado correctamente');
    });

    this.getDefaultData();
  }

  getDefaultData() {
    //Update data
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

  deleteItem(item: any) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que quieres eliminar ${item.label}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.skillService.deleteSkill(item.id).subscribe({
          next: () => {
            this.snackbarService.showMessage('Skill eliminado correctamente');
            this.getDefaultData();
          },
          error: () => {
            this.snackbarService.error(
              'Error al eliminar la habilidad. Por favor, inténtelo de nuevo.'
            );
          },
        });
      },
      reject: () => {},
    });
  }

  onPageChange(pageable: Pageable) {
    this.getData(pageable);
  }

  getData(pageable: Pageable) {
    this.loadingService.startLoading();
    this.skillService.getSkillsPage(pageable).subscribe({
      next: (data: any) => {
        this.data = data.content;
        this.totalElements = data.totalElements;
        this.loadingService.stopLoading();
      },
      error: () => {
        this.data = [];
        this.loadingService.stopLoading();

        this.snackbarService.error(
          'Error al obtener los datos. Por favor, inténtelo de nuevo.'
        );
      },
    });
  }
}
