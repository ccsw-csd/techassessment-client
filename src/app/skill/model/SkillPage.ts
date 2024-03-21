import { Pageable } from "../../core/model/page/Pageable";
import { Skill } from "./Skill";

export interface SkillPage {
    content: Skill[];
    pageable: Pageable;
    totalElements: number;
}