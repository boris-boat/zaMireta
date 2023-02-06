import { TerminiService } from './../../../services/termini.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import termini from '../../tmp.placeholder';
import { User } from 'src/app/models/user.model';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('buttonWrapper') buttonContainer: any
  zakazani: string[] = []
  user: User = new User()

  selected: Date
  termini: string[]
  constructor(private service: TerminiService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('sr');
    this.termini = termini
    this.selected = new Date()
  }
  ngOnInit(): void {
    this.getAppointmentsFromDb()
    this.termini.push("19:00", "19:15")
  }
  ngAfterViewInit() {

  }
  getTodaysAppointments() {
    let todayApps: string[] = []
    this.user.termini.forEach((item: any) => {
      let termin = new Date(item.datum)
      if (termin.toLocaleDateString("sr-SR") === this.selected.toLocaleDateString("sr-SR")) {
        todayApps.push(item.vreme)
      }
    })
    this.zakazani = todayApps
    this.checkAppointments()
  }
  checkAppointments() {

    //fn to check if appointment is made and change the button color to green
    this.allGreen()
    for (let i = 0; i < this.buttonContainer.nativeElement.children.length; i++) {
      let button = this.buttonContainer.nativeElement.children[i].children[0]
      let termin = button.innerHTML.trim()
      if (this.zakazani.includes(termin)) {
        button.classList.add("red")
      }
    }

  }
  allGreen() {
    for (let i = 0; i < this.buttonContainer.nativeElement.children.length; i++) {
      this.buttonContainer.nativeElement.children[i].children[0].classList.remove("red")
    }
  }
  toggleAppointment(btn: any) {
    if (this.zakazani.includes(btn.innerHTML.trim())) {
      for (let index in this.zakazani) {
        if (this.zakazani[index] == btn.innerHTML.trim()) {
          this.zakazani.splice(+index, 1)
        }
      }
      for (let index in this.user.termini) {
        if (this.user.termini[+index].vreme == btn.innerHTML.trim()) {
          this.user.termini.splice(+index, 1)
        }
      }
      btn.classList.toggle("green")

    }
    else {
      this.zakazani.push(btn.innerHTML.trim())
      this.user.termini.push({ datum: this.selected, vreme: btn.innerHTML.trim() })
    }

    this.checkAppointments()
    this.service.saveUser(this.user).subscribe((res) => { })

  }
  getAppointmentsFromDb() {
    this.service.getData().subscribe((users: User[]) => {
      this.user = users[0]
      this.getTodaysAppointments()
    })

  }
}
