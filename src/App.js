import React, { Component } from 'react';

//import { Layout } from 'element-react/next';
//import 'element-theme-default';

import './App.css';
import NoteForm from './components/NoteForm';
import Note from './components/Note';
import NavBar from './components/NavBar';

class App extends Component {
  constructor() {
    super();

    this.state = {
      noteData: [], 
      editing: false,
      editingNoteIndex: -1,
      serching: false,
      filteredData: [],
    }
  }

  addNoteData(header, message, tag) {
 //если editing, удалить и вставить
    const obj = {
      header: header,
      message: message,
      tag: tag,
      date: new Date(),
    };    
    if(this.state.editing) {
      this.state.noteData.splice(this.state.editingNoteIndex, 1, obj);

      this.setState(state => {
        return {
          noteData: [ ...state.noteData],
          editing: false,
        }
      });
    } else {
      this.setState(state => {
        return {
          noteData: [ ...state.noteData, obj],
        };
      });
    }    
  }

  deleteNote(index) {
    this.state.noteData.splice(index, 1);

    this.setState(state => {
      return {
        noteData: state.noteData,
      }
    });
  }

  editNote(index) {
    this.setState(state => {
      return {
        editing: true,
        editingNoteIndex: index,
      }
    });
  }

  filterData(str) {
    if(str) {
      this.setState(state => {
        return {
          searching: true,
          filteredData: this.state.noteData.filter((note) => {
            return note.header.indexOf(str) >= 0 
            || note.message.indexOf(str) >= 0 
            || note.tag.filter((tag) => tag.indexOf(str) >= 0).length > 0;
          })
        }
      })
    } else {
      this.setState(state => {
        return {
          searching: false,
        }
      })  
    }
  }

  render() {
    
    const notes = this.state.noteData;
    const index = this.state.editingNoteIndex;
    const filteredNotes = this.state.filteredData;
    return (      
      <div className="App">
      	<section className="el-container">
      		<header className="el-header">
      			<NavBar onSearch={this.filterData.bind(this)} />
      		</header>
      		<main className="el-main">
            {this.state.searching && (filteredNotes.length && filteredNotes.map((note, index) => 
              <Note 
                header={note.header} 
                message={note.message} 
                tag={note.tag}
                date={note.date} 
                key={index} 
                onDelete={() => {this.deleteNote(index)}}
                onEdit={() => {this.editNote(index)}} />
            ) || <span>Нет совпадений!</span>)}
      			
            {!this.state.searching && (this.state.editing ? 
              (<NoteForm 
                app={this} 
                header={notes[index].header} 
                message={notes[index].message} 
                tag={notes[index].tag} />) : 
              (<NoteForm app={this} />))}     

        		{!this.state.searching && (notes.length && notes.map((note, index) => 
              <Note 
                header={note.header} 
                message={note.message} 
                tag={note.tag} 
                date={note.date}
                key={index} 
                onDelete={() => {this.deleteNote(index)}}
                onEdit={() => {this.editNote(index)}} />
            ) || <span>Нет заметок</span>)}
      		</main>
      	</section>
      </div>
    );
  }
}

export default App;


