import { LightningElement } from 'lwc';

export default class TestComp extends LightningElement {
    pageCount = 20;

    changePageCountHandler(){
        this.pageCount = this.template.querySelector('lightning-input').value ;
        this.template.querySelector('c-util_pagination').initializePagination();
        console.log('yyy '+this.pageCount);

    }

}