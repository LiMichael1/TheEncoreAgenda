import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

    render() {
        return (
            <>
                <section className="hero">
                    <div className="position-relative">
                        <div className="row">
                            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
                                <h1>Welcome!</h1>
                                <p>
                                    Join an online community of Karaoke lovers!
                                </p>
                                
                                <p>Create your own account now! Join our community and rise to the top of the charts!</p>

                            </div>
                            <div className="col-lg-6 order-1 order-lg-2 text-center">
                                <div className="col-11">
                                    <i className="bi bi-music-note-list fa-6x m-4" />
                                    <i className="bi bi-calendar-plus-fill fa-6x m-4" />
                                </div>
                                <div className="col-11">
                                    <i className="bi bi-chat-heart fa-6x m-4" />
                                    <i className="bi bi-vinyl-fill fa-6x m-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="p-2 section-glow-border">
                    <div className="container">
                        <div className="section-header">
                            <h2>To help you get started</h2>
                        </div>
                        <div className="row gy-4">
                            <div className="col-lg-4 col-md-6">
                                <div className="glow-border">
                                    <div className="group-item position-relative">
                                        <div className="icon">
                                            <i className="bi bi-music-note" />
                                        </div>
                                    
                                        <p>Post your own recordings of songs we offer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="glow-border">
                                    <div className="group-item position-relative">
                                        <div className="icon">
                                            <i className="bi bi-music-note-beamed" />
                                        </div>

                                        <p>Upload your own songs from your device</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="glow-border">
                                    <div className="group-item position-relative">
                                        <div className="icon">
                                            <i className="bi bi-music-note" />
                                        </div>

                                        <p>Vote and comment on others' posts</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="glow-border">
                                    <div className="group-item position-relative">
                                        <div className="icon">
                                            <i className="bi bi-music-note-beamed" />
                                        </div>

                                        <p>Participate in limited time events</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="glow-border">
                                    <div className="group-item position-relative">
                                        <div className="icon">
                                            <i className="bi bi-music-note" />
                                        </div>

                                        <p>Visit the all time <a href="/Leaderboard">Champions Leaderboard</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="glow-border">
                                    <div className="group-item position-relative">
                                        <div className="icon">
                                            <i className="bi bi-music-note-beamed" />
                                        </div>

                                        <p>View and create events on the calendar</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            
                
            </>
        );
    }
}


