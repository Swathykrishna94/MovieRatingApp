import { Component, OnInit } from '@angular/core';
import {SearchService} from "./search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchText: string;
  public showSearchList: boolean;
  public movieList: any[];
  constructor(private searchService: SearchService) {}


  ngOnInit() {
    this.searchText = '';
    this.showSearchList = false;
  }

  // This method is called upon pressing the enter key for search and populate the movie list
  public search() {
    this.searchService.getMovieList(this.searchText).subscribe(searchResponse => {
      if (searchResponse && searchResponse.total_results > 0) {
        this.movieList = searchResponse.results;
        console.log(this.movieList);
        this.showSearchList = true;
      } else {
        this.showSearchList = false;
      }
    })
  }
}
