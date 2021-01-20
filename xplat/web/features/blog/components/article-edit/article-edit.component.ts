import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BaseComponent } from '@mxh/core';
import { BlogArticle, BlogDataService } from '../../services';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, mergeAll } from 'rxjs/operators';
import {map} from 'rxjs/operators'
@Component({
  selector: 'pkl-article-edit',
  templateUrl: 'article-edit.component.html',
})
export class ArticleEditComponent extends BaseComponent implements OnInit{
  editMode = false;
  article: BlogArticle;
  articleEditForm: FormGroup;
  onEditBackupBody = new FormArray([]);
  artId = '';
  categories: string[];
  blankImg = 'http://www.cap-altair.com/wp/wp-content/uploads/2016/04/fond-blanc-gris-Alta%C3%AFr.jpg';
  defaultDOM = `<div class="row m-t-20"><div class="col col-12 col-lg-12">

  </div></div>`
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(
    private route: ActivatedRoute,
    private blogService:BlogDataService,
    private router: Router,
    private storage: AngularFireStorage
    ) {
    super();
  }
  ngOnInit() {
    this.categories = this.blogService.categoryList.value;
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.editMode = params.artToEdit != null;
        this.artId = params.artToEdit;
        console.log(this.editMode);
      }
    );
    this.formInit();
    console.log(this.articleEditForm);
  }
  formInit() {
    console.log('formInit()');
    let title = '';
    let description = '';
    let category = '';
    let body = new FormArray([]);
    let img = this.blankImg;
    if(this.editMode){
      this.blogService.articleList.value.forEach(art => {
        if(art.id === this.artId){
          this.article = art;
          console.log('article ', art.id, ' found!');
          return
        }
      });
      console.log('ARTICLE: -----------');
      console.log(this.article);
      title = this.article.title;
      description = this.article.description;
      img = this.article.image;
      category = this.article.category;
      for(let line of this.article.body){
        body.push(new FormGroup({
          bodyDOM: new FormControl(line)
        }))
      }
    }

    this.articleEditForm = new FormGroup({
      title : new FormControl(title, Validators.required),
      coverImg: new FormControl(img),
      description: new FormControl(description, Validators.required),
      category: new FormControl(category, Validators.required),
      body : body
    });
    if(!this.editMode){
      this.addBodyDOM();
    }else{

    }

  }
  get bodyDOMsFormArray(): FormArray {
    return this.articleEditForm.get('body') as FormArray;
  }
  addBodyDOM() {
    (this.articleEditForm.get('body') as FormArray).push(new FormGroup({
     bodyDOM: new FormControl(this.defaultDOM, Validators.required)
    }));
  }
  onSaveArticle() {
    let htmlCode: string [] = [];
    for(let control of this.bodyDOMsFormArray.controls){
      htmlCode.push(control.value.bodyDOM);
      console.log(control.value.bodyDOM);
    }
    let id:string = this.articleEditForm.get('title').value;
    id = id.replace(/ /g, '-');
    console.log(id);
    this.article = new BlogArticle(
      id,
      '',
      Date.now(),
      this.articleEditForm.get('category').value,
      this.articleEditForm.get('title').value,
      this.articleEditForm.get('description').value,
      htmlCode,
      this.articleEditForm.get('coverImg').value
    );
    this.blogService.updloadArticle(this.article);
    console.log('Article save on Server');
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route, queryParams:{}})
  }
  // uploadFile(event) {
  //   const file = event.target.files[0];
  //   const filePath = 'name-your-file-path-here';
  //   const ref = this.storage.ref(filePath);
  //   const task = ref.put(file);
  // }
  uploadFile(event) {
    const file = event.target.files[0];
    console.log(file.name);
    const folder =  this.articleEditForm.controls['title'].value
    const filePath = 'blog/'+ folder +'/'+file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges().pipe( map ( num => {
      num = +(num).toFixed(1)/100
      return num;
    }));
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(
        () => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(
            url => {
              this.articleEditForm.controls['coverImg'].setValue(url);
            }
          )
        }
      )
     )
    .subscribe()
  }
  onClear() {
    /****** To STUDY FORM-RESET ***********/
    if(this.article){
      // this.articleEditForm.setValue({
      //   title : this.article.title,
      //   coverImg: this.article.image,
      //   description: this.article.description,
      //   category: this.article.category,
      //   body : this.onEditBackupBody.value
      // })
      this.formInit();
    }else{
      this.articleEditForm.setValue({
        title : '',
        coverImg: this.blankImg,
        description: '',
        category: null,
        body : [{bodyDOM:this.defaultDOM}]
      })
    // this.articleEditForm.controls['description'].setValue('');
    // this.articleEditForm.controls['coverImg'].setValue(this.blankImg);
    // this.articleEditForm.controls['title'].setValue('');
    // this.articleEditForm.controls['title'].setValue('');
    }

  }

}
