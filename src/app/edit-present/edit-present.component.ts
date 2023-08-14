import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ChildrenService } from '../services/child.service';
import { Present } from '../interfaces/present';

@Component({
  selector: 'app-edit-present',
  templateUrl: './edit-present.component.html',
  styleUrls: ['./edit-present.component.css'],
})
export class EditPresentComponent implements OnInit {
  present: Present | undefined;

  constructor(
    private route: ActivatedRoute,
    private childrenService: ChildrenService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.present = {
      id: '',
      name: '',
      childId: '',
    };

    const id = this.route.snapshot.paramMap.get('id')!;
    const childId = this.route.snapshot.paramMap.get('childId')!;

    if (id) {
      this.getPresent(id);
    } else if (childId) {
      this.present.childId = childId;
    }
  }

  getPresent(id: string): void {
    this.childrenService
      .getPresent(id)
      .subscribe((present) => (this.present = present));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.present) {
      if (this.present.id) {
        this.childrenService
          .updatePresent(this.present)
          .subscribe(() => this.goBack());
      } else {
        this.childrenService
          .registerPresent(this.present)
          .subscribe(() => this.goBack());
      }
    }
  }
}
