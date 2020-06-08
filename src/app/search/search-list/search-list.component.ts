import {Component, Input, OnInit} from '@angular/core';
import {IMG_BASE_PATH} from "../../constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  @Input()
  public movieList: any[];
  public imgBasePath: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.imgBasePath = IMG_BASE_PATH;
  }

  // This method is used to navigate to the movie details page
  public goToDetails(movieId: any) {
    this.router.navigate(['details', movieId]);
  }
}
