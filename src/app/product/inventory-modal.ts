import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    template: `
        <div class="modal-header">
        <h4 class="modal-title mb-0">Produtos em Estoque</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body" style="font-family: 'Arial', Courier, monospace;">
            <table class="table table-bordered table-hover table-sm">
                <thead>
                    <tr class="column table-dark">
                        <th scope="col">Código</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Qtd.</th>
                        <th scope="col">Preço Unidade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of inventories" class="table-light rows">
                        <th>{{item.code}}</th>
                        <th>{{item.name}}</th>
                        <th>{{item.ammount}}</th>
                        <th>R$ {{item.unit_value}}</th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fechar Janela</button>
        </div>
    `
})
export class ModalOpenInventory {
    @Input() name;

    public inventories: Array<any> = [];

    constructor(public activeModal: NgbActiveModal) { 
        this.inventories = JSON.parse(localStorage.getItem("inventories"))

        console.log("this.inventories do MODAL",this.inventories)
    }
}