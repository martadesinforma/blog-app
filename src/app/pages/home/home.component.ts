import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  featuredPostsArray: Array<Post> = []; // Retorna un array de objetos. Se veria de esta forma:  [{id: '0GtB7paWNBUd8CsEpA8h', category: {…}, content: 'q', createdAt: _Timestamp, status: 'new', …}, {...}]. Esta info la vamos a pasar al componente PostCardComponent con @Input().

  latestPostArray: Array<Post> = []; // Retorna un array de objetos. Se veria de esta forma, ordenados primero los post mas antiguos y al final los mas nuevos:  [{id: '0GtB7paWNBUd8CsEpA8h', category: {…}, content: 'q', createdAt: _Timestamp, status: 'new', …}, {...}].

  constructor(private postService: PostsService) { }

  ngOnInit(): void {

    this.postService.loadFeatured()
      .subscribe(val => {
        this.featuredPostsArray = val;
      });

    this.postService.loasLasted()
      .subscribe(val => {
        this.latestPostArray = val;
      })
  }


}
