import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { SKILLS_DATA } from "./model/mockup-skills";
import { Skill } from "./model/Skill";

@Injectable({
    providedIn: 'root'
})
export class SkillService {

  constructor() {
	
  }

  getAllSkills():Observable<Skill[]> {
	  return of(SKILLS_DATA);
  }

  getSkillsPage(pageable: any):Observable<any> {
    return of(SKILLS_DATA);
  }

}