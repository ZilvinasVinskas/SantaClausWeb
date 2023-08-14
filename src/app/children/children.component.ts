import { Component } from '@angular/core';
import { Child } from '../interfaces/child';
import { ChildrenService } from '../services/child.service';
import { Present } from '../interfaces/present';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent {
  children: Child[] = [];
  presents: Present[] = [];
  selectedChild?: Child;

  constructor(private childrenService: ChildrenService) {}

  onSelect(child: Child): void {
    this.selectedChild = child;
    this.childrenService
      .getPresents(child.id)
      .subscribe((presents) => (this.presents = presents));
  }

  ngOnInit(): void {
    this.getChildren();
  }

  getChildren(): void {
    this.childrenService
      .getChildren()
      .subscribe((children) => (this.children = children));
  }

  deleteChild(child: Child): void {
    this.children = this.children.filter((h) => h !== child);
    this.childrenService.deleteChild(child.id).subscribe();
  }

  deletePresent(present: Present): void {
    this.presents = this.presents.filter((h) => h !== present);
    this.childrenService.deletePresent(present.id).subscribe();
  }
}
