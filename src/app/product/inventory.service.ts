import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class InventoryService {
	constructor(private http: HttpClient) { }

    get(){
        return this.http.get("https://raw.githubusercontent.com/rbrtpks/inventory/main/inventory.json")
            .toPromise()
    }
}