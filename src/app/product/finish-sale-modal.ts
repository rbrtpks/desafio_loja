import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    template: `
        <div class="modal-header">
        <h4 class="modal-title mb-0">Resumo da Venda</h4>
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
                        <th scope="col">Desc.</th>
                        <th scope="col">Preço</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of sales" class="table-light rows">
                        <th>{{item.code}}</th>
                        <th>{{item.name}}</th>
                        <th>{{item.ammount}}</th>
                        <th>R$ {{item.discount}}</th>
                        <th>R$ {{item.total_value}}</th>
                    </tr>
                </tbody>
            </table>
            <div class="row">
                <span class="form-control form-control-sm col-5" id="total-order">TOTAL PEDIDO</span>
                <input type="text" disabled class="form-control form-control-sm col-7" id="total-order" aria-describedby="total-order"
                [(ngModel)]="total_order" currencyMask [options]="{ prefix: 'R$ ', thousands: '.', decimal: ',' }">
            <div>
        </div>        
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fechar Janela</button>
        </div>
    `
})
export class ModalFinishSale {
    @Input() name;

    public sales: Array<any> = [];
    total_order: Number;

    constructor(public activeModal: NgbActiveModal) { 
        this.sales = JSON.parse(localStorage.getItem("sales"))
        this.total_order = JSON.parse(localStorage.getItem("total_order"))

        console.log("FINISH SALES TESTE ModalFinishSale",this.sales)
    }
}