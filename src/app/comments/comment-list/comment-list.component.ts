import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {



  commentsArray: Array<any> = []; //commentsArray se veria de esta forma: [{id: '819Jhcer0Xxk1oUXzEru', createdAt: _Timestamp, postId: 'ZE5P2bYUyvskqk1Hp4Z4', comment: 'marta', name: 'marta'}, {...}]

  constructor(private commentsService: CommentsService, private route: ActivatedRoute) {} //ActivatedRoute contiene información sobre la ruta activa en ese momento. Esto incluye: Parámetros de la ruta (por ejemplo, un ID en la URL).

  ngOnInit(): void {

    this.route.params.subscribe(val=> { //val luce: {id: 'ZE5P2bYUyvskqk1Hp4Z4'}. Este id en la url aparece

      this.commentsService.loadData(val['id']) //val['id'] tiene que ser el queryParam de la url
      .subscribe(val => {
        this.commentsArray = val;
        console.log(this.commentsArray)
      })

    })


  }



}
