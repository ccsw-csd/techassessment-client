import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Skill } from '../model/Skill';
import { FormsModule } from '@angular/forms';
import { SkillService } from '../skill.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-skill-edit',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule],
  templateUrl: './skill-edit.component.html',
  styleUrl: './skill-edit.component.scss',
})
export class SkillEditComponent {
  skill: Skill;
  editing: boolean = false;
  buttonText: string = 'Crear';

  constructor(
    private skillService: SkillService,
    private snackbarService: SnackbarService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    if (config.data) {
      this.skill = { ...config.data };
      this.editing = true;
      this.buttonText = 'Actualizar';
      return;
    }

    this.skill = {
      id: 0,
      group: '',
      label: '',
    };
  }

  changeCreateSkill() {
    if (this.skill.group == '' || this.skill.label == '') {
      this.snackbarService.error('Los campos no pueden estar vacíos');
      return;
    }

    if (this.editing) {
      this.skillService
        .updateSkill(this.skill)
        .then(() => this.ref.close('update'));

      // Close dialog
      return;
    }

    this.skillService
      .createSkill(this.skill)
      .then(() => this.ref.close('update'));
  }
}
