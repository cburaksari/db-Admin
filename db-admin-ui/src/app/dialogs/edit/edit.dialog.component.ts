import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
import {EditColumnDialogComponent} from '../editColumn/edit-column-dialog/edit-column-dialog.component';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {
  displayedColumns = ['name', 'tag', 'datatype','actions'];
  dataSource = null;
  prevData = null;
  prevColumns : Array<Kolon> = null;
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              public dialog : MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public tabloService: TabloService,
              public kolonService: KolonService) {
                dialogRef.disableClose = true;
               }

 @ViewChild( MatTable, {static: true}) table: MatTable<any>;      
 @ViewChild('filter',  {static: true}) filter: ElementRef;

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  async ngOnInit() {
    this.dataSource = this.kolonService.dialogData;
    await this.kolonService.getKolonsByTableName(this.data.name).then(item => {
      this.table.renderRows();
    });
    this.prevData = JSON.parse(JSON.stringify(this.data));
   }

  submit() {
  }

  OnCancel(): void {
    this.dialogRef.close();
    this.kolonService.emptyDialogData();
  }

  OnEdit(): void {
    this.tabloService.updateTablo(this.prevData,this.createTable(this.data.name,this.kolonService.getDialogData()));
    this.dialogRef.close();
    this.kolonService.emptyDialogData();
  }

  async UpdateColumn(id:number, name:string, tag:string, datatype:string){
    const dialogRef = this.dialog.open(EditColumnDialogComponent,{
      data:{id:id, name:name, tag:tag, datatype:datatype}
    });
    dialogRef.afterClosed().subscribe(result => {
       this.table.renderRows();
    });
  }

  DeleteColumn(id:number){
    this.kolonService.deleteKolon(id);
    this.dataSource = this.kolonService.removeDialogData(id);
    debugger;
    this.table.renderRows();
  }

  createTable(name:string, kolonList: Kolon[]){
    let tablo = new Tablo();
    tablo.name=name;
    tablo.kolonList=kolonList;
    return tablo;
  }
}
