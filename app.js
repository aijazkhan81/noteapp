console.log('app.js running');

// Require code
const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

// App code - requires
const notes = require('./note.js');

const titleOptions = {
	describe: 'Title of the note',
	demand: true,
	alias: 't'
};

const bodyOptions = {
	describe: 'Body of the note',
	demand: true,
	alias: 'b'
}

const argv = yargs
.command('add', 'Add a new note', {
	title: titleOptions,
	body: bodyOptions
})
.command('list', 'List all the notes')
.command('read', 'Read a note', {
	title: titleOptions
})
.command('remove', 'Remove a note', {
	title: titleOptions
})
.help()
.argv;

// App Code
var command = process.argv[2];

var log = (note) =>{
	console.log('-------');
	console.log(`Adding ${note.title}`);
	console.log(`Adding ${note.body}`);
}

if(command === 'add'){
	var note = notes.addNote(argv.title, argv.body);

	if(note){
		console.log('Adding note');
		log(note);
	}
	else{
		console.log('Note already in use');
	}
}

else if(command === 'list'){
	var allNotes = notes.getAll();
	allNotes.forEach(function(note){
		log(note);
	});
}

else if(command === 'read'){
	notes.readNote(argv.title);
}

else if(command === 'remove'){
	var note = notes.removeNote(argv.title);
	var message = note ? 'Title removed' : 'Title not found';
	console.log(message);
}

else{
	console.log('Command not recognized');
}

