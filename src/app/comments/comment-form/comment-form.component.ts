import { Component, Input } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/comment';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {

  @Input()
  docId: string = ''; //id del post  donde estas escribiendo el comment. Lo recibe de singlePostComponent

  constructor(private commentsService: CommentsService) {


  }

  onSubmit(commentForm: any){
    const commentData: Comment = {
      name: commentForm.value.name,
      comment: commentForm.value.comment,
      postId: this.docId, //id del post  donde estas escribiendo el comment
      createdAt: Timestamp.fromDate(new Date())
    }

    this.commentsService.addComments(commentData);

    commentForm.reset();
  }
}
