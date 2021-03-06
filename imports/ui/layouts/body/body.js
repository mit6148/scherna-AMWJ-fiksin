import { Books } from '/imports/api/books/books.js';
import { Meteor } from 'meteor/meteor';
import './body.html';
import './body.css';
import '../../pages/loggedOut/loggedOut.js'

Template.App_body.onCreated(function () {
    Meteor.subscribe('books.yours');
    Meteor.subscribe('conversationData');
    Meteor.subscribe('messageData');
})

Template.App_body.helpers({
    isLoggedIn() {
        return Meteor.userId() != null;
    },
    librarySize() {
        return Books.find({ owner: Meteor.userId() }).count();
    },
    pathForHome() {
        return FlowRouter.path("App.home");
    },
    pathForAddBook() {
        return FlowRouter.path("App.addBook");
    },
    pathForSearch() {
        return FlowRouter.path("App.search");
    },
    pathForLibrary() {
        return FlowRouter.path("App.library", { _id: Meteor.userId() });
    },
    pathForProfile() {
        return FlowRouter.path("App.profile", { _id: Meteor.userId() });
    },
    pathForRequests() {
        return FlowRouter.path("App.requests");
    },
    pathForMessages() {
        return FlowRouter.path("App.messages");
    },
    username() {
        if (Meteor.user().username) {
            return Meteor.user().username;
        }
        else if (Meteor.user().services.facebook) {
            return Meteor.user().services.facebook.name;
        }
        return "Current User";
    },
    unreadConversationCount() {
        let count = 0;
        Meteor.user().conversations().forEach(function (convo) {
            if (convo.isUnread()) {
                count += 1;
            }
        });
        if (count === 0) {
            return null;
        }
        else {
            return count;
        }
    }
});

Template.App_body.events({
    'click .logoutButton'(event, instance) {
        event.preventDefault();
        Accounts.logout();
        FlowRouter.go('/');
    },
    'submit .searchForm'(event) {
        event.preventDefault();
        if (FlowRouter.getRouteName() == "App.search") {
            PackageSearch.search(event.target.q.value, { page: 0 });
        }
        else {
            FlowRouter.go("/search");
        }
    },
    'input #q'(event) {
        if (FlowRouter.getRouteName() == "App.search") {
            PackageSearch.search(event.target.value, {page: 0});
        }
    }
});