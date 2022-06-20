import {Component, Inject, OnInit} from '@angular/core';
import {TopicDialogComponent} from "../../../../components/topic-dialog/topic-dialog.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {QuestionDialogComponent} from "./question-dialog/question-dialog.component";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  searchValue = '';
  dataSource = [
    {id: 1, question: 'What is the only number that has the same number of letters as it’s meaning?'},
    {id: 2, question: 'What number doesn’t have its own Roman numeral?'},
    {id: 3, question: 'What is the only even prime number?'},
    {id: 4, question: 'What is the smallest perfect number?'},
    {id: 5, question: 'What is our current numerical system based on?'},
    {id: 6, question: 'Is Pi a rational or irrational number?'},
    {id: 7, question: 'Which number is considered a “magic number?”'},
    {id: 8, question: 'What is the most popular lucky number?'},
    {id: 9, question: 'Which is the most prime number of the first ten?'},
    {id: 10, question: 'How much would the paper weigh if you printed out the number Googolplex?'},
    // {id: 11, question: 'Where is four considered an unlucky number?'},
  ];
  displayedColumns: string[] = ['id', 'question', 'actions'];

  constructor(
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  openQuestion(data?: any) {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '800px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
