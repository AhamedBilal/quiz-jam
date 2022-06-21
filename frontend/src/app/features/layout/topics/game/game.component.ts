import {Component, OnInit} from '@angular/core';
import {waitFor} from "../../../../config/shared";
import {NgxSpinner, NgxSpinnerService} from "ngx-spinner";
import {timer} from "rxjs";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  isMatchMaking = true;

  time = 10;

  timeOp = 10;
  answerTime = 0;
  isCorrect = false;

  opEnded = false;
  userEnded = false;

  yourScore = 0;
  opponentScore = 0;
  yourIndex = 0;
  opponentIndex = 0;

  questions = [
    {
      id: 1,
      question: 'What is the only number that has the same number of letters as it’s meaning?',
      answer: 4,
      answers: [4, 3, 5, 6],
      answered: false,
    },
    {
      id: 2,
      question: 'What number doesn’t have its own Roman numeral?',
      answer: 0,
      answers: [3, 5, 6, 0],
      answered: false,
    },
    {
      id: 3,
      question: 'What is the only even prime number?',
      answer: 2,
      answers: [4, 2, 5, 6],
      answered: false,
    },
    {
      id: 4,
      question: 'What is the smallest perfect number?',
      answer: 6,
      answers: [4, 2, 5, 6],
      answered: false,
    },
    {
      id: 5,
      question: 'Which is the most prime number of the first ten?',
      answer: 7,
      answers: [4, 7, 5, 6],
      answered: false,
    },
    {
      id: 6, question: 'What is the most popular lucky number?',
      answer: 7,
      answers: [69, 777, 7, 13],
      answered: false,
    },
    {
      id: 7,
      question: 'Which number is considered a “magic number?”',
      answer: 9,
      answers: [66, 44, 8, 9],
      answered: false,
    },
  ];
  userTimer: any;

  constructor(private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.spinner.show();
    await waitFor(2000)
    this.spinner.hide();
    await waitFor(2500);
    this.isMatchMaking = false;
    this.startGame();
    this.startOp();
  }


  startGame() {
    this.userTimer = setInterval(() => {
      this.time--;
      if (this.time < 0) {
        this.time = 10;
        if (this.yourIndex < 6) {
          this.yourIndex++;
        } else {
          this.userEnded = true;
          clearInterval(this.userTimer);
        }
      }
    }, 1000);
  }

  startOp() {
    this.answerTime = Math.floor(Math.random() * 9) + 1;
    this.isCorrect = Math.floor(Math.random() * 10) > 5;
    const timer = setInterval(() => {
      this.timeOp--;
      if (this.answerTime === this.timeOp) {
        if (this.isCorrect) {
          if (!this.questions[this.opponentIndex].answered) {
            this.opponentScore += 10;
          } else {
            this.opponentScore += 5;
          }
        } else if (this.yourScore !== 0) {
          this.yourScore -= 5;
        }
        if (this.yourIndex < 6) {
          this.opponentIndex++;
          this.timeOp = 10;
        } else {
          this.opEnded = true;
          clearInterval(timer);
        }
        this.answerTime = Math.floor(Math.random() * 9) + 1;
        this.isCorrect = Math.floor(Math.random() * 10) > 5;
      }
      if (this.timeOp < 0) {
        this.timeOp = 10;
        if (this.opponentIndex < 6) {
          this.opponentIndex++;
          this.answerTime = Math.floor(Math.random() * 9) + 1;
          this.isCorrect = Math.floor(Math.random() * 10) > 5;
        } else {
          this.opEnded = true;
          clearInterval(timer);
        }
      }
    }, 1000);
  }

  select(data: number) {
    if (data === this.questions[this.yourIndex].answer) {
      if (!this.questions[this.yourIndex].answered) {
        this.yourScore += 10;
      } else {
        this.yourScore += 5;
      }
      if (this.yourIndex < 6) {
        this.yourIndex++;
      } else {
        this.userEnded = true;
        clearInterval(this.userTimer);
      }
      this.time = 10;
    } else if (this.yourScore !== 0) {
      this.yourScore -= 5;
    }
  }


}
