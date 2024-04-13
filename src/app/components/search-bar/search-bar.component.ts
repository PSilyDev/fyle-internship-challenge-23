import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  username: string;
  @Output() searchClicked = new EventEmitter<string>();

  search(): void {
    this.searchClicked.emit(this.username);  
  }

  constructor() {
    this.username = '';
  }

  ngOnInit(): void {
      
  }
}
