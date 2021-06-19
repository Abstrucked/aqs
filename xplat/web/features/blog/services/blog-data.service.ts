import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap, map,take } from 'rxjs/operators';
import { AuthService } from '../../auth/services';

export class BlogArticle {
  constructor(
    public id: string,
    public user: string,
    public date: number,
    public category: string,
    public title: string,
    public description: string,
    public body: string[],
    public image?: string,
  ) {}
}
@Injectable({
  providedIn: 'root',
})



export class BlogDataService implements OnInit {
  articleList =  new BehaviorSubject<BlogArticle[]>(null);
  collection:AngularFirestoreCollection<BlogArticle>
  articles: BlogArticle[] = [ ];
  clickedArticle = new BehaviorSubject<BlogArticle>(null);
  categorySub: Subscription;
  categoryList = new BehaviorSubject<string []>(null);
  constructor(private angularFirestore:AngularFirestore, private authService:AuthService) {
    this.fetchCategories();
  }
  ngOnInit(){

  }
  fetchCategories(){
    // console.log('looking for categories');

    const cat = this.angularFirestore.collection('blog').doc<{cat_name: string}[]>('categories').valueChanges();
    this.categorySub = cat.pipe(take(1)).subscribe(
      categories => {
        // console.log(categories['cat_names']);
        this.categoryList.next(categories['cat_names']);
      }
    )
  }
  fetchArticles():Promise<void>{

    return new Promise<void>(
      (res, rej) => {
        let articlesColl = this.angularFirestore.collection<BlogArticle>('blog/articles/all');
        let articlesObs = articlesColl.valueChanges();
        articlesObs.subscribe(
          listOfArticles => {
            this.articles = listOfArticles;
            this.articleList.next(listOfArticles);


            res()
          }
        )
      }
    )
  }
  fetchArticlesByUser(user: string):Promise<void>{
    return new Promise(
      (res,rej) => {
        if(user){
          //let colls:AngularFirestoreCollectionGroup<BlogArticle[]>;
        //colls = new AngularFirestoreCollectionGroup({},this.angularFirestore)
        let coll:AngularFirestoreCollection<BlogArticle[]> =  this.angularFirestore.collection<BlogArticle[]>('blog');
        // console.log('USER: ', user);

        let x = coll.doc('articles').collection<BlogArticle>('all', ref => ref.where('user','==',user)).valueChanges();
        x.subscribe(
          data => {
            // console.log(data);
            this.articleList.next(data)

          }
        )

        res()
        }

      }
    )
  }
  fetchArticleById(id: string): Promise<BlogArticle>{
        return new Promise<BlogArticle>(
          (res,rej) => {
            let x = this.angularFirestore.collection<BlogArticle>('blog')
                    .doc('articles').collection<BlogArticle>('all').doc(id)
                    .valueChanges()
            x.subscribe( art => {
              if(art){
                // console.log('selecting article:', art.id);
                res(art);
              }else{
                // console.log('no ART');

              }
            })
          }
        )


  }
  updloadArticle(article: BlogArticle){
    if(this.authService.loggedUser){
      let user = this.authService.loggedUser.value.uid
      this.collection = this.angularFirestore.collection<BlogArticle>('blog/'+user+'/'+article.category);
      this.collection.doc(article.id).set({
        body:article.body,
        user:user,
        category:article.category,
        date:article.date,
        description:article.description,
        id:article.id,
        title: article.title,
        image:article.image
      }).then(
        () => {
          this.collection = this.angularFirestore.collection<BlogArticle>('blog/articles/all');
          this.collection.doc(article.id).set({
            body:article.body,
            user:user,
            category:article.category,
            date:article.date,
            description:article.description,
            id:article.id,
            title: article.title,
            image:article.image
          })
        }
      );
    }
  }
  deleteArticle(articleId: string) {
    this.collection =this.angularFirestore.collection<BlogArticle>('blog/articles/all');
    this.collection.doc(articleId).delete().then(
      () => {
        // console.log('Article Deleted!!');
      }

    )
  }

}
