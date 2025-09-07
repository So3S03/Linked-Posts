import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl = environment.ApiBaseUrl;

  //create comment
  createComment(commentData: any): Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}comments`, commentData);
  }

  //get post's comments
  getPostComment(postId: string): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}posts/${postId}/comments`);
  }

  //update comment
  updateComment(commentId: string, commentContent: any): Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}comments/${commentId}`, {content: commentContent});
  }

  //delete comment
  deleteComment(commentId: string): Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}comments/${commentId}`);
  }

}
