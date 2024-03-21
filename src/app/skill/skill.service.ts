import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { environment } from "src/environments/environment";
import { Pageable } from "../core/model/page/Pageable";
import { Skill } from "./model/Skill";
import { SkillPage } from "./model/SkillPage";
import { SKILLS_DATA } from "./model/mockup-skills";

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor(private http: HttpClient) {

  }
  private readonly baseUrl: string = environment.server;

  async createSkill(skill: Skill) {
    return await this.http.post(`${this.baseUrl}/skill/new`, skill).subscribe();
  }

  getAllSkills(): Observable<Skill[]> {
    return of(SKILLS_DATA);
  }


  getSkillsPage(pageable: Pageable): Observable<SkillPage> {

    return this.http.post<SkillPage>(`${this.baseUrl}/skill`, {
      pageable: pageable,
    });

  }

}