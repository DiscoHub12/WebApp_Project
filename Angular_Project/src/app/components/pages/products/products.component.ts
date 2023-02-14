import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products = [
    {
      name: 'Prodotto 1',
      description: 'Questa è una descrizione del prodotto 1',
      price: 10,
      imageUrl: 'https://via.placeholder.com/500x325'
    },
    {
      name: 'Prodotto 2',
      description: 'Questa è una descrizione del prodotto 2',
      price: 20,
      imageUrl: 'https://via.placeholder.com/500x325'
    },
    {
      name: 'Prodotto 3',
      description: 'Questa è una descrizione del prodotto 3',
      price: 30,
      imageUrl: 'https://via.placeholder.com/500x325'
    } ,
    {
      name: 'Prodotto 4',
      description: 'Questa è una descrizione del prodotto 1',
      price: 10,
      imageUrl: 'https://via.placeholder.com/500x325'
    },
    {
      name: 'Prodotto 5',
      description: 'Questa è una descrizione del prodotto 2',
      price: 20,
      imageUrl: 'https://via.placeholder.com/500x325'
    },
    {
      name: 'Prodotto 6',
      description: 'Questa è una descrizione del prodotto 3',
      price: 30,
      imageUrl: 'https://via.placeholder.com/500x325'
    },  {
      name: 'Prodotto 7',
      description: 'Questa è una descrizione del prodotto 1',
      price: 10,
      imageUrl: 'https://via.placeholder.com/500x325'
    },
    {
      name: 'Prodotto 8',
      description: 'Questa è una descrizione del prodotto 2',
      price: 20,
      imageUrl: 'https://via.placeholder.com/500x325'
    },
    {
      name: 'Prodotto 9',
      description: 'Questa è una descrizione del prodotto 3',
      price: 30,
      imageUrl: 'https://via.placeholder.com/500x325'
    }
  ]

}
