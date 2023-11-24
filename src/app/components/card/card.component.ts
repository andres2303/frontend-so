import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { CardModel } from 'src/app/model/card-model';
import { CardService } from 'src/app/service/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  listCards: CardModel [] = [];
  formCard: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  deletedBook: CardModel | undefined;
  

  constructor(private cardService: CardService ){}

  ngOnInit(): void{
     this.list();
     this.formCard = new FormGroup({
      idLibros: new FormControl(''),
      titulo: new FormControl(''),
      codigo:new FormControl(''),
      nPaginas:new FormControl(0),
      precio:new FormControl(0),
      stock:new FormControl(0),
      categoria:new FormControl(''),
      editorial:new FormControl(''),
      autor:new FormControl(''),
     });
  }

  list(){
    this.cardService.getCards().subscribe(resp=>{
      if(resp){
        this.listCards = resp
      }
    });
  }
  save() {
    const bookData = {
       idLibros: this.formCard.controls['idLibros'].value,
       titulo: this.formCard.controls['titulo'].value,
       codigo: this.formCard.controls['codigo'].value,
       nPaginas: this.formCard.controls['nPaginas'].value,
       precio: this.formCard.controls['precio'].value,
       stock: this.formCard.controls['stock'].value,
       categoria: this.formCard.controls['categoria'].value,
       editorial: this.formCard.controls['editorial'].value,
       autor: this.formCard.controls['autor'].value,
       status: '1', 
    };
 
    console.log(bookData); 
 
    this.cardService.saveCards(bookData).subscribe(resp => {
       if (resp) {
          this.list();
          this.formCard.reset();
       }
    });
 }

 update() {
  const bookData = {
     idLibros: this.formCard.controls['idLibros'].value,
     titulo: this.formCard.controls['titulo'].value,
     codigo: this.formCard.controls['codigo'].value,
     nPaginas: this.formCard.controls['nPaginas'].value,
     precio: this.formCard.controls['precio'].value,
     stock: this.formCard.controls['stock'].value,
     categoria: this.formCard.controls['categoria'].value,
     editorial: this.formCard.controls['editorial'].value,
     autor: this.formCard.controls['autor'].value,
  };

  console.log(bookData); 

  
  const idLibros = this.formCard.controls['idLibros'].value;

  this.cardService.updateCards(idLibros, bookData).subscribe(resp => {
     if (resp) {
        this.list();
        this.formCard.reset();
     }
  });
}



  newLibro(){
     this.isUpdate = false;
     this.formCard.reset();
  }
  selectItem(item: any) {
   this.isUpdate = true;
   this.formCard.controls['idLibros'].setValue(item.idLibros);
   this.formCard.controls['titulo'].setValue(item.titulo);
   this.formCard.controls['codigo'].setValue(item.codigo);
   this.formCard.controls['nPaginas'].setValue(item.nPaginas);
   this.formCard.controls['precio'].setValue(item.precio);
   this.formCard.controls['stock'].setValue(item.stock);
   this.formCard.controls['categoria'].setValue(item.categoria);
   this.formCard.controls['editorial'].setValue(item.editorial);
   this.formCard.controls['autor'].setValue(item.autor);

  }
  delete(idLibros: any) {
    this.cardService.deleteCards(idLibros).subscribe(resp=>{
      if(resp){
        this.list();
      }
    });
  }
 

}
