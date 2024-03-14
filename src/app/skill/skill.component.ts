import { Component, OnInit, ViewChild } from '@angular/core';
import { SkillService } from './skill.service';
import { Skill } from './model/Skill';
import { ButtonModule } from 'primeng/button';
import { Pageable } from '../core/model/page/Pageable';
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
 tableColumns: string[] = ['id', 'group', 'label']

  constructor(public skillService: SkillService) {
    this.getServicePage = skillService.getSkillsPage.bind(skillService);
  }


  ngOnInit(): void {
    
  }

}
