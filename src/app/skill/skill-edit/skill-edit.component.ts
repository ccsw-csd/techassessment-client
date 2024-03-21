import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Skill } from '../model/Skill';
import { FormsModule } from '@angular/forms';
import { SkillService } from '../skill.service';
import { MessageService } from 'primeng/api';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-skill-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [SnackbarService, MessageService],
  templateUrl: './skill-edit.component.html',
  styleUrl: './skill-edit.component.scss',
})
export class SkillEditComponent implements OnInit {
  visible: boolean = false;
  skill: Skill;

  constructor(
    private skillService: SkillService,
    private snackbarService: SnackbarService
  ) {
    this.skill = {
      id: 0,
      group: '',
      label: '',
    };
  }

  ngOnInit(): void {}

  resetSkill() {
    this.skill = {
      id: 0,
      group: '',
      label: '',
    };
  }

  showDialog() {
    this.resetSkill();
    this.visible = true;
  }


  createSkill() {
    if (this.skill.group == '' || this.skill.label == '') {
      this.snackbarService.error('Los campos no pueden estar vacíos');
      return;
    }

    this.visible = false;
    this.skillService.createSkill(this.skill).then(() => {
      this.snackbarService.showMessage('Skill creado correctamente');
    });
  }
}
