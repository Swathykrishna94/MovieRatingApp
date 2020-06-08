import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../search/search.service";
import {IMG_BASE_PATH} from "../constants";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  private movieId: string;
  public movieDetails: any;
  public showMovieDetails: boolean
  public imgBasePath: string
  public rating: any;

  constructor(private activatedRoute: ActivatedRoute, private searchService: SearchService) {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('movieId');
    this.showMovieDetails = false;
    this.imgBasePath = IMG_BASE_PATH;
  }

  ngOnInit() {
    this.getMovieDetails();
  }

  // This method is used to details of the selected movie
  private getMovieDetails() {
    this.searchService.getMovieDetails(this.movieId).subscribe(movieResponse => {
      if (movieResponse) {
        this.movieDetails = movieResponse;
        this.showMovieDetails = true;
      } else {
        this.showMovieDetails = false;
      }
    })
  }

  // This method is used to submit the rating for the selected movie
  public submitRating() {
    if (this.rating && this.rating >= 0.5 && this.rating <= 10 && this.rating%0.5 === 0) {
      if (this.searchService.sessionId) {
        this.searchService.rateMovie(this.movieId, this.rating).subscribe(ratingResponse => {
          if (ratingResponse.status_message === 'The item/record was updated successfully.') {
            alert('Your rating has been successfully submitted');
            this.getMovieDetails();
          }
        });
      } else {
        alert('Please authenticate the token')
      }
    } else {
      alert('Please enter a value between 0.5-10 in an increment of 0.5');
    }
  }
}
