import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = environment.ApiBaseUrl;

  //create post
  createPost(postData: any): Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}posts`, postData);
  }

  //get all posts
  getAllPosts(pageNum?: number): Observable<any>
  {
    if(pageNum) return this._HttpClient.get(`${this.baseUrl}posts?page=${pageNum}`);
    
    return this._HttpClient.get(`${this.baseUrl}posts`);
  }

  //get my posts
  getUserPosts(): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}users/664bcf3e33da217c4af21f00/posts`); //the url id is a bug from back end
  }

  //get single post
  getSinglePost(postId: string): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}posts/${postId}`);
  }

  //update post
  updatePost(postId: string, postData: any): Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}posts/${postId}`, postData);
  }

  //delete post
  deletePost(postId: string): Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}posts/${postId}`);
  }
}
