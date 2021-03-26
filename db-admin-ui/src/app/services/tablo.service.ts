import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Tablo } from '../models/tablo';

@Injectable()
export class TabloService {
    private readonly base_URL = 'http://localhost:8081/tables';

    dataChange: BehaviorSubject<Tablo[]> = new BehaviorSubject<Tablo[]>([]);
    dialogData: any;

    constructor (private httpClient: HttpClient) {}

    get data(): Tablo[] {
        return this.dataChange.value;
    }

    updateDialogData(tablo: Tablo){
      this.dialogData = tablo;
    }

    removeDialogData(id: number) : Array<Tablo>{
      this.dialogData = this.dialogData.filter(item => item.id !== id);
      return this.dialogData;
    }

    getDialogData() {
        return this.dialogData;
    }

    getAllTablo(): void {
        this.httpClient.get<Tablo[]>(this.base_URL).subscribe(item => {
            this.dataChange.next(item);
          },
          (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
          });
    }

    addTablo(tablo: Tablo): void {
      console.log("tablo adding : " + JSON.stringify(tablo));
        this.httpClient.post(this.base_URL, tablo).subscribe(item => {
          this.dialogData = tablo;
          },
          (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
        });
      console.log("tablo added");
    }

    updateTablo(prevTablo: Tablo, newTablo: Tablo): void {
        const params = new HttpParams({
           fromObject: {
             name: prevTablo.name
            }
        });
        debugger;
        this.httpClient.put(this.base_URL + '/' + prevTablo.name,newTablo).subscribe(item => {
          
          },
          (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
          }
        );
    }

    async deleteTablo(id: number): Promise<void> {
       await this.httpClient.delete(this.base_URL + '/'+ id).toPromise().then(result=>{
           console.log("result : " + result);
       }).catch(error => {
         console.log("error" + error);
       });
      }




}