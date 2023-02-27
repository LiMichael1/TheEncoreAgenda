import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>Join an online community of Karaoke lovers where you can:</p>
                <ul>
                    <li>Post your own recordings of songs we offer</li>
                    <li>Upload your own songs from your device</li>
                    <li>Interact with the community by voting and commenting on other's posts</li>
                    <li>Participate in limited time events</li>
                </ul>
                <p>To help you get started:</p>
                <ul>
                    <li><strong>Visit the all time <a href="/Leaderboard">Champions Leaderboard</a>.</strong> Here you can <code>post</code> your recordings, <code>vote</code> and <code>comment</code> on other's as well. This is a long standing leaderboard <code>seperate</code> from other events' leaderboards.</li>
                    <li><strong>View available events and create your own</strong>. Visit the Calendar page where you can view official events and participate on their leaderboards as well as schedule your own events <code>Soon adding the capability to invite friends to custom events</code> </li>
                    <li><strong>Create your own account now!</strong> Join our community and rise to the top of the charts!</li>
            </ul>
            </div>
        );
    }
}


