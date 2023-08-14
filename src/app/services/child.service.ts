import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Child } from '../interfaces/child';
import { MessageService } from './message.service';
import { Present } from '../interfaces/present';

@Injectable({ providedIn: 'root' })
export class ChildrenService {
  private childrenUrl = 'http://localhost:5000/api/child';
  private presentsUrl = 'http://localhost:5000/api/present';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getChildren(): Observable<Child[]> {
    return this.http.get<Child[]>(this.childrenUrl).pipe(
      tap((_) => this.log('fetched children')),
      catchError(this.handleError<Child[]>('getChildren', []))
    );
  }

  deleteChild(id: string): Observable<Child> {
    const url = `${this.childrenUrl}/${id}`;

    return this.http.delete<Child>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted child id=${id}`)),
      catchError(this.handleError<Child>('deleteChild'))
    );
  }

  getChild(id: string): Observable<Child> {
    const url = `${this.childrenUrl}/${id}`;
    return this.http.get<Child>(url).pipe(
      tap((_) => this.log(`fetched child id=${id}`)),
      catchError(this.handleError<Child>(`getChild id=${id}`))
    );
  }

  updateChild(child: Child): Observable<any> {
    return this.http.put(this.childrenUrl, child, this.httpOptions).pipe(
      tap((_) => this.log(`updated child id=${child.id}`)),
      catchError(this.handleError<any>('updateChild'))
    );
  }

  registerChild(child: Child): Observable<any> {
    return this.http
      .post<Child>(this.childrenUrl, child, this.httpOptions)
      .pipe(
        tap((_) => this.log(`added child `)),
        catchError(this.handleError<Child>('addChild'))
      );
  }

  getPresents(id: string): Observable<Present[]> {
    const url = `${this.presentsUrl}/all/${id}`;
    return this.http.get<Present[]>(url).pipe(
      tap((_) => this.log('fetched presents')),
      catchError(this.handleError<Present[]>('getPresents', []))
    );
  }

  getPresent(id: string): Observable<Present> {
    const url = `${this.presentsUrl}/${id}`;
    return this.http.get<Present>(url).pipe(
      tap((_) => this.log('fetched present')),
      catchError(this.handleError<Present>('getPresent'))
    );
  }

  registerPresent(present: Present): Observable<any> {
    return this.http
      .post<Present>(this.presentsUrl, present, this.httpOptions)
      .pipe(
        tap((_) => this.log(`added present `)),
        catchError(this.handleError<any>('addPresent'))
      );
  }

  updatePresent(present: Present): Observable<any> {
    return this.http.put(this.presentsUrl, present, this.httpOptions).pipe(
      tap((_) => this.log(`updated present id=${present.id}`)),
      catchError(this.handleError<any>('updatePresent'))
    );
  }

  deletePresent(id: string): Observable<Present> {
    const url = `${this.presentsUrl}/${id}`;
    return this.http.delete<Present>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted present id=${id}`)),
      catchError(this.handleError<Present>('deletePresent'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ChildrenService: ${message}`);
  }
}
