import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-sinlge-category',
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css'
})
export class SingleCategoryComponent implements OnInit {

  postArray: Array<Post>= []; // Retorna un array de objetos. Se veria de esta forma:  [{id: '0GtB7paWNBUd8CsEpA8h', category: {…}, content: 'q', createdAt: _Timestamp, status: 'new', …}, {...}]. Esta info la vamos a pasar al componente PostCardComponent con @Input().

  categoryObj: any;


  constructor(private route: ActivatedRoute, private postService: PostsService){} //ActivatedRoute contiene información sobre la ruta activa en ese momento. Esto incluye: Parámetros de la ruta (por ejemplo, un ID en la URL).

  ngOnInit(): void {

    this.route.params.subscribe(val => { //val luce: {category: 'h', id: 'GSfwCX5URN3eTQEAnIcH'} Este id y esta category en la url aparece porque en el componente category-navbar.component.html hemos hecho que cuando el usuario haga clic en cualquiera de los enlaces que aparecen, será redirigido a una URL que comienza con /category y continua con el valor dinámico que proviene de category.data.category y  category.id del post

      this.categoryObj = val;

      this.postService.loadCategoryPosts(val['id'])
        .subscribe(post => {
          this.postArray = post;
        })
    })
  }

}
