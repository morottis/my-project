import { Injectable } from '@angular/core';
import { ServizioHttpService } from './servizio-http.service';
import { of } from 'rxjs';
import { environment } from '../../environment';

interface Config {
  value: string | Array<string> | Record<string, unknown> | undefined;
  sensitive: boolean;
  key: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(
    private http: ServizioHttpService,
  ) {}

  createConfig(config: Config , UUID : string | undefined  ) {
    

    if (UUID) {
      return this.http.createEntity(
        environment.configurationUrl,
        config,
        UUID
      );
    }

    return of(UUID); 
  }
}