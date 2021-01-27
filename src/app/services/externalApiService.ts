import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class ExternalService{

    constructor(private http: HttpClient) {
        
    }       

    async getCitiesByUf(uf : string){
        let cities : string [] = [];
        await this.http.get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.toLowerCase()}/distritos`)
                .subscribe(response => { 
                    response.forEach(element => {
                                 cities.push(element.nome);
                            }); 
                    cities.sort();
        });
        return cities;
    }
}