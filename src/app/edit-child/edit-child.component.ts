import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Child } from '../interfaces/child';
import { ChildrenService } from '../services/child.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.css'],
})
export class EditChildComponent implements OnInit {
  child: Child | undefined;

  constructor(
    private route: ActivatedRoute,
    private childrenService: ChildrenService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    name: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(35),
      ]),
    ],
    surname: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(35),
      ]),
    ],
  });

  ngOnInit(): void {
    this.child = {
      id: '',
      name: '',
      surname: '',
    };
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.getChild(id);
    }
  }

  getChild(id: string): void {
    this.childrenService
      .getChild(id)
      .subscribe((child) => (this.child = child));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.child) {
      if (this.child.id) {
        this.childrenService
          .updateChild(this.child)
          .subscribe(() => this.goBack());
      } else {
        this.childrenService
          .registerChild(this.child)
          .subscribe(() => this.goBack());
      }
    }
  }
}
