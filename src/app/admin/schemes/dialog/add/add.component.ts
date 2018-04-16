import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddSchemeComponent implements OnInit {
  public categoryNames=[];
  constructor( private categoryService: CategoryService ) { }

  ngOnInit() {
    this.categoryService.GetAllCategoryNames()
    .subscribe(res => {      
      let items = JSON.parse(JSON.stringify(res.json()));
      
      let n: number = items.length;
      console.log("length : "+items.length);
      while(n--) {
          this.categoryNames.push(items[n]['categoryName']);   
      }
      console.log("categoryNames : "+this.categoryNames);
    })
  }
  onSubmit(form) {
    
  }
}
