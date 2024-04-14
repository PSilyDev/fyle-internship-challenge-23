// import { Component, EventEmitter, Input, Output } from '@angular/core';

// @Component({
//   selector: 'app-repository-list',
//   templateUrl: './repository-list.component.html',
//   styleUrls: ['./repository-list.component.scss']
// })
// export class RepositoryListComponent {
//   @Input() repositories: any[];
//   @Input() currentPage: number;
//   @Input() totalRepositories: number;

//   @Output() pageChange = new EventEmitter<number>();

//   pageSize: number = 10; // Default page size

//   constructor() {
//     this.currentPage = 1
//   }

//   get totalPages(): number {
//     return Math.ceil(this.totalRepositories / this.pageSize);
//   }

//   get paginatedRepositories(): any[] {
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     const endIndex = Math.min(startIndex + this.pageSize, this.totalRepositories);
//     console.log('pageSize - ', this.pageSize)
//     console.log('currentPage - ', this.currentPage)
//     console.log('startIndex - ', startIndex)
//     console.log('ednIndex - ', endIndex)
//     return this.repositories.slice(startIndex, endIndex);
//   }

//   prevPage() {
//     if (this.currentPage > 1) {
//       this.pageChange.emit(this.currentPage - 1);
//     }
//   }

//   nextPage() {
//     if (this.currentPage < this.totalPages) {
//       this.pageChange.emit(this.currentPage + 1);
//     }
//   }
// }


import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
  @Input() repositories: any[];
  @Input() currentPage: number;

  @Output() pageChange = new EventEmitter<number>();

  pageSize: number = 10; // Default page size

  constructor() {
    this.currentPage = 1;
  }

  get totalRepositories(): number {
    return this.repositories ? this.repositories.length : 0;
  }

  get totalPages(): number {
    return Math.ceil(this.totalRepositories / this.pageSize);
  }

  get paginatedRepositories(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalRepositories);
    return this.repositories.slice(startIndex, endIndex)
    
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Increment currentPage
      this.pageChange.emit(this.currentPage); // Emit updated page number
    }
  }
  
}
