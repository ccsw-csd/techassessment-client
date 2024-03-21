import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { SKILLS_DATA } from "./model/mockup-skills";
import { Skill } from "./model/Skill";
import { Pageable } from "../core/model/page/Pageable";
import { HttpClient } from "@angular/common/http";
import { SkillPage } from "./model/SkillPage";
import { API_URL } from "../../config";

@Injectable({
    providedIn: 'root'
})
export class SkillService {

  constructor(private http:HttpClient) {
	
  }

  async createSkill(skill: Skill) {
    return await this.http.post(`${API_URL}skill/new`, skill).subscribe();
  }

  getAllSkills():Observable<Skill[]> {
	  return of(SKILLS_DATA);
  }


  getSkillsPage(pageable:Pageable):Observable<SkillPage>{
    
    return this.http.post<SkillPage>(`${API_URL}skill`,{
      pageable:pageable,
    });

  }

}