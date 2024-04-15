import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
  @Input() repositories: any[];
  @Input() currentPage: number;
  @Input() pageSize: number;

  @Output() pageSizeChange = new EventEmitter<number>();


  languageColors: any = {
    'JavaScript': 'bg-yellow-500',
    'TypeScript': 'bg-blue-500',
    'Python': 'bg-green-500',
    'HTML': 'bg-red-500',
    'CSS': 'bg-pink-500',
    'PHP': 'bg-cyan-500'
  };
  

  constructor() {
    this.currentPage = 1;
    this.pageSize = 10;
  }

  
  get totalRepositories(): number {
    return this.repositories ? this.repositories.length : 0;
  }

  
  get paginatedRepositories(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalRepositories);
    return this.repositories.slice(startIndex, endIndex)
    
  }


  getLanguageClass(language: string): string {
    return this.languageColors[language] || 'bg-gray-700'; //default color for badges
  }


  pageSizeChanged(event: any) {
    this.pageSizeChange.emit(event.target.value); //emit page size to parent
  }
  
}
