import { Timestamp } from "@angular/fire/firestore";

export interface Comment {
  name: string,
  comment:string,
  postId?:string, //Lo recibe de singlePostComponent
  createdAt?: Timestamp,
}
