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

  nome_organization_Subject = new BehaviorSubject<any>(null);
  sharedData_nome = this.nome_organization_Subject.asObservable();

  prefix_organization_Subject = new BehaviorSubject<any>(null);
  sharedData_prefix = this.prefix_organization_Subject.asObservable();

  dbname_organization_Subject = new BehaviorSubject<any>(null);
  sharedData_dbname = this.dbname_organization_Subject.asObservable();


  constructor() { }

  modifico_dato_catalean(data : boolean)
  {
    this.Catalean_Subject.next(data); // invia il dato ai subscriber di shareData 
    
  }

  modifico_dato_smartco(data : boolean)
  {
    this.SmartCo_Subject.next(data); // invia il dato ai subscriber di shareData 
    
  }

  dati_organizazione( data : any , data2 : any , data3 : any)
  {
    this.nome_organization_Subject.next(data);
    this.dbname_organization_Subject.next(data2); 
    this.prefix_organization_Subject.next(data3);  
  }
}
