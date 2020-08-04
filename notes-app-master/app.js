const chalk = require('chalk');
const yargs = require('yargs');
const note = require('./notes.js');
const log = console.log;

const addCommand = {
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: ({title, body}) => {
        note.AddNote(title, body); 
    }
};

const removeCommand = {
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: ({ title }) => {
        note.RemoveNote(title); 
    }
};

const listCommand = {
    command: 'list',
    describe: 'list the notes',
    handler: () => {
        note.ListNotes();
    }
};

const readCommand = {
    command: 'read',
    describe: 'read a note',
    handler: ({ title }) => {
        note.ReadNote(title); 
    }
};

yargs.command(addCommand);
yargs.command(removeCommand);
yargs.command(listCommand);
yargs.command(readCommand);

log('');
yargs.parse();
