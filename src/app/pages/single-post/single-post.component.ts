import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit{

  postData!: Post;
  similarPostArray: any[] = []; //array de post que comparten category.categoryId con el postData.

  constructor(private postService: PostsService, private route: ActivatedRoute){} //ActivatedRoute contiene información sobre la ruta activa en ese momento. Esto incluye: Parámetros de la ruta (por ejemplo, un ID en la URL).

  ngOnInit(): void {
    this.route.params.subscribe(val=> { //val luce: {id: 'ZE5P2bYUyvskqk1Hp4Z4'}. Este id en la url aparece porque en el componente post-card.component.html hemos hecho que cuando el usuario haga clic en cualquiera de los posts que aparecen, será redirigido a una URL que comienza con /post y continua con el valor dinámico que proviene de postData.id


      //Primero  llamamos a la función countViews() para incrementar el contador de vistas en Firestore y luego a la función loadOnePost() para cargar y mostrar el post actualizado con el nuevo conteo de vista

      this.postService.countViews(val['id']);

      this.postService.loadOnePost(val['id'])
        .subscribe(post=> {
          this.postData = post;
          this.loadSimilarPost(this.postData.category.categoryId)
        })
    })
  }

  loadSimilarPost(categoryId: any) {
    this.postService.loadSimilar(categoryId)
      .subscribe(val => {
        this.similarPostArray = val;
      })
  }

}
