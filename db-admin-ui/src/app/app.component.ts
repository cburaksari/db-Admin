import {Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { TabloService } from './services/tablo.service';
import { Tablo } from './models/tablo';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns = ['name','actions'];
  exampleDatabase: TabloService | null;
  dataSource: ExampleDataSource | null;
  name: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public tabloService: TabloService,
              private changeDetectorRef: ChangeDetectorRef) {}

  @ViewChild(MatTable, {static: true}) table: MatTable<string>; 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  refresh() {
    this.loadData();
  }

  AddTable() {
    const dialogRef = this.dialog.open(AddDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
        this.exampleDatabase.dataChange.value.push(this.tabloService.getDialogData());
        this.refreshTable();
    });
  }

  EditTable(name: string){
    const dialogRef = this.dialog.open(EditDialogComponent,{
      data: {name : name}
    });
    dialogRef.afterClosed().subscribe(result => {
        const index = this.exampleDatabase.dataChange.value.findIndex(x => x.name === this.name);
        this.exampleDatabase.dataChange.value[index] = this.tabloService.getDialogData();
        this.refreshTable();
    });
  }

  async RemoveTable(id:number){
    await this.tabloService.deleteTablo(id).then(item => {
      this.refreshTable();
    });
  }

  private refreshTable() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    this.table.renderRows();
  }

  public loadData() {
    this.exampleDatabase = new TabloService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Tablo> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Tablo[] = [];
  renderedData: Tablo[] = [];

  constructor(public _exampleDatabase: TabloService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<Tablo[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllTablo();


    return merge(...displayDataChanges).pipe(map( () => {
        this.filteredData = this._exampleDatabase.data.slice().filter((tablo: Tablo) => {
          let searchStr;
          if(tablo !== undefined){
           searchStr = (tablo.name).toLowerCase();}
          return searchStr !== undefined && searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}

  sortData(data: Tablo[]): Tablo[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
