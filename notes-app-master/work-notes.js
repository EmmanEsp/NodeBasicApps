const fs = require('fs');

const CheckDuplicateNote = (title, notes) => {
    return notes.find((note) => note.title === title);    
}

const SaveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
};

const LoadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        
        return JSON.parse(dataJson);  
    } catch(error) {
        return [];
    } 
}

module.exports = { CheckDuplicateNote, SaveNotes, LoadNotes };