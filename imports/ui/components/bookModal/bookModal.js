﻿import { Books } from '/imports/api/books/books.js';
import { Meteor } from 'meteor/meteor';
import { BookRequests } from '/imports/api/bookRequests/bookRequests.js';
import './bookModal.html';
import './bookModal.css'

Template.bookModal.onCreated(function () {
    console.log(this);
});

Template.bookModal.helpers({
    alreadyRequested() {
        return BookRequests.find({ bookId: this._id, fromUserId: Meteor.userId() }).count() > 0;
    },
    pathToUserLibrary() {
        return FlowRouter.path("App.library", {_id: this.owner});
    },
    username() {
        return Meteor.users.findOne(this.owner).username;
    }
});

Template.bookModal.events({
    'click .requestBookButton'(event) {
        Meteor.call('bookRequests.create', this.owner, this._id);
    },
    'click .deleteRequestButton'(event) {
        const bookRequestId = BookRequests.findOne({ bookId: this._id, fromUserId: Meteor.userId() })._id;
        Meteor.call('bookRequests.delete', bookRequestId);
    }
});

function stripHTML(string){
      s = string.replace(/(<([^>]+)>)/ig, '');
      return s;
}

Template.registerHelper('stripHTML', stripHTML)