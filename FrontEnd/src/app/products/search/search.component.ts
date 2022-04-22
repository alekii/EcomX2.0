import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'; 
import { SearchService } from '../../services/search.service'; 

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit { 
  searchString = "" 
   constructor(private route: ActivatedRoute, 
    private searchService: SearchService) { }

  ngOnInit(): void { 
    this.route.params.subscribe((params:Params)=>{
    this.searchString = params['searchText'] 
    console.log(this.searchString) 
     this.searchService.setSearchResults(this.searchString)
    })
}
}