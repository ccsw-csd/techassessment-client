import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading/services/loading.service';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent implements OnInit {
  constructor(private loadingService: LoadingService) {

  }
  ngOnInit(): void {
    this.loadingService.startLoading()
    setTimeout(() => {
      this.loadingService.stopLoading()

    }, 4000)
  }

}
