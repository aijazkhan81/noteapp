console.log('note.js running');

const fs = require('fs');

var fetchNotes = () => {
	try {
		var noteString = fs.readFileSync('test.json');
		return JSON.parse(noteString);
	} catch(e) {
		return []
	}
}

var saveNotes = (notes) =>{
	fs.writeFileSync('test.json', JSON.stringify(notes));
}

var addNote = (title, body) =>{
	var notes = fetchNotes();
	var note = {
		title,
		body
	};

	var duplicateNotes = notes.filter((note) => note.title === title);

	if(duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}	
};

var getAll = () => {
	var notes = fetchNotes();
	return notes;
};

var readNote = (title) => {
	var notes = fetchNotes();
	var filteredNote = notes.filter((note) => note.title === title);
	console.log(filteredNote[0].title)
};

var removeNote = (title) => {
	var notes = fetchNotes();
	var duplicateNotes = notes.filter((note) => note.title !== title);
	saveNotes(duplicateNotes);
	return duplicateNotes.length != notes.length;
};


// Exporting the functions
module.exports = {
	addNote,
	getAll,
	readNote,
	removeNote
}