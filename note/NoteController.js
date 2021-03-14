const Note = require("./NoteModel");
const mongoose = require("mongoose");
const config = require("../config");

createNote = (req, res) => {
    if (!req.body.content || typeof req.body.content !== "string") {
        return res.status(400).json({
            success: false,
            error: "Bad content param"
        });
    }

    const newId = mongoose.Types.ObjectId();
    let newNote = new Note({
        content: req.body.content,
        id: Math.floor(Math.random() * 100000000000000)
    });
    if (req.body.title) {
        if (typeof req.body.title !== "string") {
            return res.status(400).send({
                success: false,
                error: "Bad title param"
            });
        }
        newNote.title = req.body.title
    }
    else {
        newNote.title = req.body.content.substr(0, Math.min(config.titleN, req.body.content.length));
    }

    newNote.save().then(() => {
        console.log(newNote);
        return res.status(201).json({
            id: newNote.id,
            title: newNote.title,
            content: newNote.content
        });
    }).catch(err => {
        return res.status(500).json( {
            success: false,
            error: err
        })
    });
}

getNotes = (req, res) => {
    let filter = {};
    if (req.query.query) {
        filter = {
            $or: [
                {
                    title: {$regex: req.query.query}
                }, {
                    content: {$regex: req.query.query}
                }
            ]
        }
    }

    Note.find(filter).select("-_id -__v").then(notes => {
        return res.status(200).json(notes);
    }).catch(err => {
        return res.status(500).json( {
            success: false,
            error: err
        })
    });
}

getNote = (req, res) => {
    Note.findOne({id: req.params.id}).select("-_id -__v").then(note => {
        if (!note) {
            return res.status(404).json( {
                success: false,
                error: "Id not found"
            });
        }
        return res.status(200).json(note);
    }).catch(err => {
        return res.status(500).json( {
            success: false,
            error: err
        })
    });
}

editNote = (req, res) => {
    if (req.body.content && typeof req.body.content !== "string") {
        return res.status(400).json({
            success: false,
            error: "Bad content param"
        });
    }
    if (req.body.title && typeof req.body.title !== "string") {
        return res.status(400).json({
            success: false,
            error: "Bad title param"
        });
    }
    Note.findOne({id: req.params.id}).then(note => {
        if (!note) {
            return res.status(404).json( {
                success: false,
                error: "Id not found"
            });
        }

        if (req.body.content) {
            note.content = req.body.content;
        }
        if (req.body.title) {
            note.title = req.body.title;
        }
        else {
            note.title = note.content.substr(0, Math.min(config.titleN, note.content.length));
        }
        console.log(note);

        note.save().then(() => {
            return res.status(200).send();
        })
    }).catch(err => {
        return res.status(500).json( {
            success: false,
            error: err
        })
    });
}

deleteNote = (req, res) => {
    Note.findOneAndDelete({id: req.params.id}).select("-_id -__v").then(note => {
        if (!note) {
            return res.status(404).json( {
                success: false,
                error: "Id not found"
            });
        }
        return res.status(200).send();
    }).catch(err => {
        return res.status(500).json( {
            success: false,
            error: err
        })
    });
}

module.exports = {
    createNote,
    getNotes,
    getNote,
    editNote,
    deleteNote
};