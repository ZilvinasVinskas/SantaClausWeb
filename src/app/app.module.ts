import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildrenComponent } from './children/children.component';
import { RouterModule } from '@angular/router';
import { ChildrenService } from './services/child.service';
import { MessageService } from './services/message.service';
import { HttpClientModule } from '@angular/common/http';
import { EditChildComponent } from './edit-child/edit-child.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { EditPresentComponent } from './edit-present/edit-present.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent,
    EditChildComponent,
    NavMenuComponent,
    EditPresentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot([
      { path: '', component: ChildrenComponent, pathMatch: 'full' },
      { path: 'edit-child/:id', component: EditChildComponent },
      { path: 'register-child', component: EditChildComponent },
      { path: 'edit-present/:id', component: EditPresentComponent },
      { path: 'register-present/:childId', component: EditPresentComponent },
    ]),
  ],
  providers: [MessageService, ChildrenService],
  bootstrap: [AppComponent],
})
export class AppModule {}
