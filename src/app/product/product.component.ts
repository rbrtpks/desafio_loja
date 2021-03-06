import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from './inventory.service'

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOpenInventory } from './inventory-modal';
import { ModalFinishSale } from './finish-sale-modal';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    sales: Array<any> = [];
    public inventories: Array<any> = [];
    product: any = {
        'id': Number,
        'code': '',
        'name': '',
        'ammount': '',
        'unit_value': Number,
        'discount': Number,
        'total_value': Number
    };    
    total_order: Number = 0;
    errorMessage: String = '';
    editingMode: boolean = false;
    filterText: String;

    constructor(
        private toastr: ToastrService,
        private service: InventoryService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.setInventory()
        this.getSale()
    }

    async setInventory() {
        try{
            const response: any = await this.service.get()
            localStorage.setItem("inventories", JSON.stringify(response))

            this.inventories = response

        } catch (err) {
            console.log("erro",err)
            this.showError('Contate o administrador do sistema!')
        }
    }

    listInventory() {
        try{
            this.modalService.open(ModalOpenInventory);
        }catch(err) {
            console.log("err")
            this.showError('Contate o administrador do sistema!')
        }
    }

    getSale() {
        this.total_order = 0;
        this.sales = JSON.parse(localStorage.getItem("sales"))
        if(this.sales != null) this.sales.forEach(element => {
            element.total_value = parseFloat(element.total_value)
            this.total_order += element.total_value
        })
        localStorage.setItem('total_order', JSON.stringify(this.total_order));
        this.editingMode = false
        this.product = {}
        this.product.discount = 0
        this.filterText = ''
    }

    save() {
        try {
            if(JSON.parse(localStorage.getItem("sales")) != null){
                this.sales = [...JSON.parse(localStorage.getItem("sales"))]
            } else {
                this.sales = []
            }

            if(!this.product.id) this.product.id = Math.floor(Math.random() * 999999) + this.product.code

            this.errors()
            if (this.errorMessage) return this.showError(this.errorMessage)

            if(this.editingMode){
                this.sales.forEach(element => {
                    if(element.id == this.product.id){
                        element.code = this.product.code
                        element.name = this.product.name
                        element.ammount = this.product.ammount
                        element.unit_value = Number(this.product.unit_value).toFixed(2).toString()
                        element.discount = Number(this.product.discount).toFixed(2).toString()
                        element.total_value = Number(this.product.total_value).toFixed(2).toString()
                    }
                })
            } else {
                this.product.unit_value = Number(this.product.unit_value).toFixed(2).toString()
                this.product.discount = Number(this.product.discount).toFixed(2).toString()
                this.product.total_value = Number(this.product.total_value).toFixed(2).toString()

                this.sales.push(this.product)
            }

            this.inventories.find(element => {
                if(element.code == this.product.code){
                    console.log(element)
                }
            })

            localStorage.setItem("sales", JSON.stringify(this.sales))
            this.showSuccess('Produto cadastrado com sucesso!')
            this.getSale()
        } catch (err) {
            console.log("err")
            this.showError('Contate o administrador do sistema!')
            this.getSale()
        }
    }

    errors() {
        function isInteger(value) {
            return (value == parseInt(value));
        }

        this.inventories.forEach(element => {
            if(this.product.ammount <= 0){
                return this.errorMessage = 'Quantidade não pode ser menor ou igual a zero e deve ser menor ou igual a quantidade em estoque.'
            }
            if(!isInteger(this.product.ammount)){
                return this.errorMessage = 'A quantidade deve ser um número inteiro.'
            }
        })

        if(!this.product.code || !this.product.name || !this.product.unit_value){
            this.errorMessage = 'Selecione um produto antes de continuar!'
        }
        
        if (this.sales.length > 0 && !this.editingMode) {
            this.sales.forEach(element => {
                if (element.code === this.product.code) this.errorMessage = 'Já existe um produto cadastrado com este código!'
                if (element.name === this.product.name) this.errorMessage = 'Já existe um produto cadastrado com este nome!'
            });
        }
    }

    filter(event: any){
        this.inventories.forEach(element => {
            if(element.code == event.target.value || element.name == event.target.value){
                this.product = element
                delete this.product.ammount
            }
        })
        let exist = this.inventories.find(element => element.code == this.product.code || element.name == this.product.name)
        if(!exist) return this.showError('Este código ou nome de produto não está cadastrado')
        this.changeTotalOrder()
    }

    rowEditing(itemId) {
        this.product = {}
        this.sales.forEach(element => {
            if(element.id == itemId) {
                this.product = element
            }
        });
    }

    changeTotalOrder() {
        if(!this.product.discount) this.product.discount = 0
        if(!this.product.ammount) this.product.ammount = 1
        this.product.total_value = this.product.ammount * this.product.unit_value - this.product.discount;
    }

    delete(itemId: number) {
        try {
            let sales = JSON.parse(localStorage.getItem("sales"))

            sales.forEach((element, pos) => { if (element.id == itemId) sales.splice(pos, 1) });

            localStorage.setItem('sales', JSON.stringify(sales));
            this.showSuccess('Produto deletado com sucesso!')
            this.getSale()
        } catch (err) {
            console.log(err)
            this.showError('Contate o administrador do sistema!')
        }
    }

    finishSale() {
        try{
            this.modalService.open(ModalFinishSale);
            this.showSuccess('Venda finalizada com sucesso!')
        }catch(err) {
            console.log("err")
            this.showError('Contate o administrador do sistema!')
        }
    }

    reset() {
        localStorage.removeItem('sales')
        this.sales = []
        this.showSuccess('Você cancelou sua venda com sucesso!')
    }

    showSuccess(message) {
        this.toastr.success(message);
    }

    showError(message) {
        this.toastr.error(message, 'Erro na ação!');
        this.errorMessage = null
    }
}