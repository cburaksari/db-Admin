import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TabloService } from '../../../services/tablo.service';
import { KolonService } from '../../../services/kolon.service';
import { EditDialogComponent } from '../../edit/edit.dialog.component';
import { Kolon } from '../../../models/kolon';

@Component({
  selector: 'app-edit-column-dialog',
  templateUrl: './edit-column-dialog.component.html',
  styleUrls: ['./edit-column-dialog.component.css']
})
export class EditColumnDialogComponent implements OnInit {

  prevData = new Kolon();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public tabloService: TabloService,
  public kolonService: KolonService,
  public dialogRef: MatDialogRef<EditDialogComponent>) { }

  ngOnInit(): void {
    this.prevData = JSON.parse(JSON.stringify(this.data));
  }

  onSubmit() {
    this.kolonService.changeDialogData(this.data,this.prevData);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
