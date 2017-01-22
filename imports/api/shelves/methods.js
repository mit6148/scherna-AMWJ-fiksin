import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Shelves } from './shelves.js';

Meteor.methods({
    'shelves.create'(name) {
        check(name, String);
        const shelf = Shelves.findOne({
            name,
            owner: Meteor.userId()
        });
        if (shelf) {
            throw new Meteor.Error("shelf-exists",
                "This shelf already exists.");
        }

        return Shelves.insert({
            name,
            owner: Meteor.userId()
        });
    },
    'shelves.delete'(shelfId) {
        check(shelfId, String);
        const shelf = Shelves.findOne(shelfId);
        if (!shelf) {
            throw new Meteor.Error("no-such-shelf",
                "This shelf does not exist.");
        }
        Shelves.remove(shelfId);
    },
});