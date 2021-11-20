import { Todo } from './../models/todos.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list'
  public todos: Todo[] = []
  public title: string = 'Minhas tarefas'
  public form: FormGroup 

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // primeiro parametro referente ao valor padrão do campo
      // segundo parametro qual propriedade será adicionada ao form
      title: ['',  Validators.compose([ // compose serve para adicionar varios validadores
        Validators.minLength(3),// minimo de caracteres
        Validators.maxLength(60),// maximo de caracteres
        Validators.required // campo obrigatório
      ])]
    })    
    
    this.load()
  }

  // Adicionar tarefa
  add() {
    const title = this.form.controls['title'].value //pegar valor do title 
    const id = this.todos.length + 1
    this.todos.push(new Todo(title, false, id))
    this.save()
    this.clear()
  }

  //limpar formulário
  clear() {
    this.form.reset()
  }


  // Remover tarefa
  remove(todo: Todo) {
    const index = this.todos.indexOf(todo)
    if (index !== -1) {
      this.todos.splice(index, 1)
    }

    this.save()
  }

  // Marcar tarefa como concluida
  markAsDone(todo: Todo) {
    todo.done = true
    return true
    this.save()
  }

  // Marcar tarefa como não concluida
  markAsUndone(todo: Todo) {
    todo.done = false

    this.save()
  }

  // gravar dados no LocalStorage
  save() {
    const data = JSON.stringify(this.todos)
    localStorage.setItem('todos', data)
    this.mode = 'list'
  }

  // Carregar dados salvos no LocalStorage
  load() {
    const data = localStorage.getItem('todos')
    if (data) {
      this.todos = JSON.parse(data)
    } else {
      this.todos = []
    }
  }

  // alterar tipo de modal
  changeMode( modo: string ) {
    this.mode = modo
  }

}
