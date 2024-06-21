import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassagioDatiService {

  Catalean_Subject = new BehaviorSubject<any>(null);
  sharedData$ = this.Catalean_Subject.asObservable(); // emette i valori da sharedDataSubject 

  SmartCo_Subject = new BehaviorSubject<any>(null);
  sharedData_SmartCo = this.SmartCo_Subject.asObservable();

  constructor() { }

  modifico_dato_catalean(data : boolean)
  {
    this.Catalean_Subject.next(data); // invia il dato ai subscriber di shareData 
    
  }

  modifico_dato_smartco(data : boolean)
  {
    this.SmartCo_Subject.next(data); // invia il dato ai subscriber di shareData 
    
  }
}
