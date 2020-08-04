const chalk = require('chalk');
const WorkNotes = require('./work-notes.js');
const log = console.log;

const ListNotes = () => { 
    const notes = WorkNotes.LoadNotes();
    log(chalk.inverse('Your notes!'));
    notes.forEach(note => {
        log("Title: " + note.title);
        log('');
    });
}

const AddNote = (title, body) => {
    const notes = WorkNotes.LoadNotes();
    const duplicateNotes = WorkNotes.CheckDuplicateNote(title,notes);
    
    debugger;

    if(!duplicateNotes){ 

        notes.push({
            title,
            body
        });
    
        WorkNotes.SaveNotes(notes);
        log(chalk.green.inverse('New note added!'));
        
        log('Title: ' + title);
        log('Body: ' + body);
    } else {
        log(chalk.red.inverse('Note title taken!'));
    }
}

const RemoveNote = (title) => {
    const notes = WorkNotes.LoadNotes();
    const noteExist = WorkNotes.CheckDuplicateNote(title, notes);

    if(noteExist){
        const notesToKeep = notes.filter((note) => note.title !== title);
        WorkNotes.SaveNotes(notesToKeep);
        log(chalk.green.inverse("Note removed!"));
        ListNotes(); 
    } else {
        log(chalk.red.inverse("No note found!"));
    }

}

const ReadNote = (title) => {
    const notes = WorkNotes.LoadNotes();
    const noteExist = WorkNotes.CheckDuplicateNote(title, notes);

    if(noteExist){
        var readNote = notes.find((note) => note.title === title);
        
        log(chalk.green.inverse('Note found!'));        
        log('Title: ' + readNote.title);
        log('Body: ' + readNote.body);
    } else {
        log(chalk.red.inverse("No note found!"));
    }

}

module.exports = { ListNotes, AddNote, RemoveNote, ReadNote };