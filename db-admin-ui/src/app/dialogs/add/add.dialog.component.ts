import { MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Tablo} from '../../models/tablo';
import { TabloService } from '../../services/tablo.service';
import { KolonService } from '../../services/kolon.service';
import { Kolon } from '../../models/kolon';
import {MatDialog} from '@angular/material/dialog';
import {ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ColumnDialogComponent} from '../addColumn/column-dialog/column-dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements OnInit {
  tablo = new Tablo();
  displayedColumns = ['name', 'tag', 'datatype','actions'];
  dataSource = null;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              public dialog : MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: Tablo,
              public tabloService: TabloService,
              public kolonService: KolonService,
              public httpClient: HttpClient) {
                dialogRef.disableClose = true;
               }
      

  @ViewChild(MatTable, {static: true}) table: MatTable<Kolon>;      
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
   this.dataSource = this.kolonService.dialogData;
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  addNew() {
    const dialogRef = this.dialog.open(ColumnDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
        this.refreshAndLoad();
    })
    
  }

  refreshAndLoad(){
    this.kolonService.getDialogData().forEach(item=> {
      if(!this.kolonService.dataChange.getValue().includes(item))
          this.kolonService.dataChange.value.push(item);
    });
    this.table.renderRows();
  }

  submit(){}

  onCancel(): void {
    this.kolonService.emptyDialogData();
    this.table.renderRows();
    this.dialogRef.close();
  }
  

  createNewTable(tableName:string , kolonList: Kolon[]){
    let tablo = new Tablo();
    tablo.name = tableName;
    tablo.kolonList = kolonList;
    return tablo;
  }

  public AddTable(): void {
    this.createNewTable(this.tablo.name, this.kolonService.getDialogData());
    this.tabloService.addTablo(this.createNewTable(this.tablo.name, this.kolonService.getDialogData()));
    this.onCancel();
  }
}