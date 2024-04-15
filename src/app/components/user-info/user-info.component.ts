import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  // receiving all data from parent
  @Input() profileImageUrl: string;
  @Input() name: string;
  @Input() bio: string;
  @Input() location: string;
  @Input() xUrl: string;
  @Input() githubUrl: string;

  constructor(){ }

}
