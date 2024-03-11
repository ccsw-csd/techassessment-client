import { Component, OnInit } from '@angular/core';
import { SkillService } from './skill.service';
import { Skill } from './model/Skill';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [TableModule,ButtonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
})
export class SkillComponent implements OnInit {
  constructor(private skillService: SkillService) {}

  skills: Skill[] = [];

  ngOnInit(): void {
    this.skillService.getAllSkills().subscribe((skills_) => this.skills = skills_);
  }

  
}
