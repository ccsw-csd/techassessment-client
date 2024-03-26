import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Skill } from '../model/Skill';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SkillService } from '../skill.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-edit',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './skill-edit.component.html',
  styleUrl: './skill-edit.component.scss',
})
export class SkillEditComponent {
  skill: Skill;
  editing: boolean = false;
  buttonText: string = 'Crear';
  form: FormGroup;

  constructor(
    private skillService: SkillService,
    private snackbarService: SnackbarService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    if (config.data) {
      this.skill = { ...config.data };
      this.editing = true;
      this.buttonText = 'Actualizar';
    } else {
      this.skill = {
        id: 0,
        group: '',
        label: '',
      };
    }

    this.form = this.fb.group({
      group: new FormControl(this.skill.group, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(1),
      ]),
      label: new FormControl(this.skill.label, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(1),
      ]),
    });
  }

  changeCreateSkill() {
    if (this.form.invalid) {
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
