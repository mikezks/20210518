import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { iif, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, pairwise, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit {
  control = new FormControl();
  // Stream Result
  flights$: Observable<Flight[]>;
  loading: boolean;
  destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {
    setTimeout(() => this.destroy$.next(), 5000);
  }

  ngOnInit(): void {
    // Stream 1: Trigger
    this.flights$ = this.control.valueChanges.pipe(
      // filter(city => city.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(city =>
        iif(
          () => city.length > 2,
          of(city).pipe(
            tap(() => this.loading = true),
            switchMap(city => this.load(city)),
            tap(() => this.loading = false)
          ),
          of([])
        )
      )
    );
  }

  // Stream 2: HTTP Call Data Provider
  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

}
