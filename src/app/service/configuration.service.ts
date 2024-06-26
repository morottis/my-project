import { Injectable } from '@angular/core';
import { ServizioHttpService } from './servizio-http.service';
import { PassagioDatiService } from './passagio-dati.service';
import { of } from 'rxjs';

interface Config 
{
   value : string | boolean | Array<string> | Record<string,unknown> ,
   sensitive : boolean  , 
   key : string  , 
   type : string
}


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {


  constructor( private http :  ServizioHttpService , private passagioDatiService : PassagioDatiService) { }

  createConfig(  config : Config )
  {
    const UUID = this.passagioDatiService.UUIDSubject.value;

    if(UUID) {
      return this.http.post('https://configuration.datalean-nodejs-dev.catalean.com/config' , config , UUID)
    
    }
    
    return of('arrivato'); // of trasforma l' input in observable 

  }
}
