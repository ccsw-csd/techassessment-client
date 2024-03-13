import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Skill } from '../model/Skill';
import { FormsModule } from '@angular/forms';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-skill-edit',
  standalone: true,
  imports: [ButtonModule, DialogModule, FormsModule,InputTextModule],
  templateUrl: './skill-edit.component.html',
  styleUrl: './skill-edit.component.scss',
})
export class SkillEditComponent implements OnInit {
  visible: boolean = false;
  skill: Skill;

  constructor(private skillService: SkillService,) {
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

  show(){
 
  }

  createSkill() {
    //TODO Mostrar mensaje de error si no se ingresan los datos
    if(this.skill.group == '' || this.skill.label == '') return;

    this.skillService.createSkill(this.skill);
    this.visible = false;
  }

}
