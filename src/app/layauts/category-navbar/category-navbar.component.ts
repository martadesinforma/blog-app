import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css'
})
export class CategoryNavbarComponent implements OnInit{

  categoryArray: Array<any> = []; //Se veria de esta forma: [{data: {category: 'hola'} id: "m1VjCvgL6PFXULVTyvKN" }, {data: {category: 'uri'} id: "Zotz2wMaJwVVZn1J79Ws" },  ]

  constructor(private categoryService: CategoriesService){}

  ngOnInit(): void {
    this.categoryService.loadData()
      .subscribe(val => {
        this.categoryArray = val;
      })
  }

}
