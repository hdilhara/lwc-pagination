import { LightningElement,api,track } from 'lwc';
/**
 * Created By: Thilina Hettiarachchige
 * Created Date: 2022 07 03
 * Description: Modern Pagination component
 */
export default class Util_pagination extends LightningElement {

    @api pagecount;
    showPagination = false;
    @track pagination = {
        pageCount: 0,
        currentPage: 0,
        pages: []
    }

    connectedCallback(){
        console.log('xxx pagecount: ' + this.pagecount);
        this.pagination.currentPage = 1;
        this.initializePagination();
    }

    @api initializePagination(){
        console.log('yyy pagecount: ' + this.pagecount);
        this.pagination.pageCount = this.pagecount;

        let {pageCount, currentPage, pages} = this.pagination;
        this.showPagination = false;
        let escapeDots = false;
        if(pageCount>1){
            this.showPagination =true;
            pages = [];
            pages.push({value: 'Previous', isDisabled: (currentPage==1?true:false), handler: this.pageHandler});
            for(let i=1; i<=pageCount; i++){
                if(currentPage<5 && i==6){
                    pages.push({value: '...', isDisabled: true, handler: null});
                    i = pageCount;
                }else if(currentPage>=5){
                    if(i==2){
                        pages.push({value: '...', isDisabled: true, handler: null});
                        if(currentPage>  pageCount-5){
                            i=pageCount-4;
                            escapeDots = true;
                        }else{
                            i = currentPage-2;
                        }   
                    }
                    if(i==currentPage+3 && !escapeDots){
                        pages.push({value: '...', isDisabled: true, handler: null});
                        i = pageCount;
                    } 
                }
                pages.push({value: i, isDisabled: (currentPage==i?true:false), handler: this.pageHandler});
            }
            pages.push({value: 'Next', isDisabled: (currentPage==pageCount?true:false), handler: this.pageHandler});
            this.pagination.pages = pages;
            this.pagination.pageCount = pageCount;
            this.pagination.currentPage = currentPage;
        }
        else{
            this.showPagination = false;
        }
    }

    pageHandler(e){
        const action = e.target.label;
        let {currentPage} = this.pagination;
        if(action === 'Next'){
            currentPage++;
        }else if(action === 'Previous'){
            currentPage--;
        }else{
            currentPage = action;
        }
        this.pagination.currentPage = currentPage;
        this.initializePagination();
    }
}