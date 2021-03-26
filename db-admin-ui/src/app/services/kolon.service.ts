import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Kolon } from '../models/kolon';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { map } from 'rxjs/operators';

@Injectable()
export class KolonService {
    private readonly base_URL = 'http://localhost:8081/columns';

    dataChange: BehaviorSubject<Kolon[]> = new BehaviorSubject<Kolon[]>([]);
    dialogData: Array<Kolon> = new Array<Kolon>();
    prevColumns: Array<Kolon> = new Array<Kolon>();

    constructor (private httpClient: HttpClient) {}

    get data(): Kolon[] {
        return this.dataChange.value;
    }

    emptyDialogData(){
      this.dialogData = new Array<Kolon>();
    }

    updateDialogData(kolon: Kolon){
      this.dialogData.push(kolon);
    }

    removeDialogData(id: number) : Array<Kolon>{
      this.dialogData = this.dialogData.filter(item => item.id !== id);
      return this.dialogData;
    }

    changeDialogData(kolon: Kolon, prevKolon: Kolon){
      this.dialogData.forEach((element, index) => {
        if(element.name === prevKolon.name) {
            this.dialogData[index] = kolon;
        }
    });
    }

    getDialogData() {
        return this.dialogData;
    }

    getPrevColumns(){
      return this.prevColumns;
    }

    async getAllKolon() {
      await this.httpClient.get<Kolon[]>(this.base_URL).toPromise().then(result => {
        this.dataChange.next(result);
      });
    }

    addKolon(kolon: Kolon): void {
        this.httpClient.post(this.base_URL, kolon).subscribe(item => {
         // this.dialogData = kolon;
          },
          (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
        });
    }

    updateKolon(kolon: Kolon): void {
        this.httpClient.put(this.base_URL + kolon.id, kolon).subscribe(item => {
           // this.dialogData = kolon;
          },
          (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
          }
        );
    }

    deleteKolon(id:number): void {
        this.httpClient.delete(this.base_URL + '/' + id).subscribe(item => {

          },
          (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
          }
        );
      }
    
    async getKolonsByTableName(name: string){
      const params = new HttpParams({
        fromObject: {
          name: name
        }
      });
      await this.httpClient.get<Kolon[]>(this.base_URL + '/getColumnsByTableName',{
        params:params
      }).toPromise().then(result => {
        result.forEach(item=> {
          this.updateDialogData(item);
          this.prevColumns.push(item);
        });
      });
      }
}