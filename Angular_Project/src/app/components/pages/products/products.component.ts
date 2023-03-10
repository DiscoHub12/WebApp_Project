import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products = [
    {
      name: 'Shampo capelli ricci',
      price: 5,
      imageUrl: './assets/imm.jpeg'
    },
    {
      name: 'Shampo capelli lisci',
      price: 5,
      imageUrl: './assets/imm.jpeg'
    },
    {
      name: 'Shampo capelli crespi',
      price: 8,
      imageUrl: './assets/imm.jpeg'
    },
    {
      name: 'Shampo anti forfora',
      price: 9,
      imageUrl: './assets/imm.jpeg'
    },
    {
      name: 'Balsamo capelli lisci',
      price: 7,
      imageUrl: './assets/imm.jpeg'
    },
    {
      name: 'Balsamo capelli ricci',
      price: 7,
      imageUrl: './assets/imm.jpeg'
    }, 
    {
      name: 'Gel uomo',
      price: 9,
      imageUrl: './assets/imm.jpeg'
    },
    {
      name: 'Schiuma per capelli',
      price: 6,
      imageUrl: './assets/imm.jpeg'
    },
    {
      name: 'Dopo barba',
      price: 8,
      imageUrl: './assets/imm.jpeg'
    },
  ]

}
