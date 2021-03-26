import { Component, OnInit } from '@angular/core';
import { KolonService } from '../../../services/kolon.service';
import {Kolon} from '../../../models/kolon';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-column-dialog',
  templateUrl: './column-dialog.component.html',
  styleUrls: ['./column-dialog.component.css']
})
export class ColumnDialogComponent implements OnInit {

  kolon = new Kolon();
  constructor(private kolonService : KolonService,public dialogRef: MatDialogRef<ColumnDialogComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.kolonService.updateDialogData(this.kolon);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
