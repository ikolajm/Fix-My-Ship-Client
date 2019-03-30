import React, {Component} from 'react'
import moment from 'moment'

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            allQuestions: [],
            dropdown: 'Most Recent'
        }
    }

    componentDidMount() {
        this.grabMostRecent()
    }

    grabMostRecent = () => {
        fetch(`http://localhost:3001/questions`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(results => results.json())
        .then(json => {
            this.setState({
                allQuestions: json.results.reverse()
            })
        })
        .catch(err => console.log(err.message))
    }

    handleDrop = (e) => {
        this.setState({
            dropdown: e.target.value
        })
    }

    render() {
        let term = '';
        let questionReturn = {}

        if (this.state.dropdown === 'Most Recent') {
            term = 'Most Recent Questions';
            questionReturn = this.state.allQuestions.map((question, index) => {
                return (
                    // Question Cards
                    <div className="question-card" key={index}>
                        {/* Content */}
                        <h5 className="home-question-content">{question.content.substring(0, 75)}</h5>
                        {/* Created by */}
                        <h5 className="home-question-owner">{question.owner.username}</h5>
                        <div className="home-question-meta">
                            {/* Date */}
                            <h5 className="home-question-date">{moment(question.createdAt).format('MMMM Do YYYY, h:mm a')}</h5>
                            {/* # of comments */}
                            <h5 className="home-question-comments">{question.comments.length} comments</h5>
                            {/* # of upvotes */}
                            <h5 className="home-question-upvotes">Upvotes: {question.upvotes}</h5>
                        </div>
                    </div>
                )
            })
        } else if (this.state.dropdown === 'Top Rated') {
            term = 'Top Rated Questions';
            questionReturn = this.state.allQuestions.sort((a, b) => {
                if (a.upvotes > b.upvotes) {
                    return 1;
                } else {
                    return -1
                }
            })
            questionReturn = questionReturn.map((question, index) => {
                return (
                    // Question Cards
                    <div className="question-card" key={index}>
                        {/* Content */}
                        <h5 className="home-question-content">{question.content.substring(0, 75)}</h5>
                        {/* Created by */}
                        <h5 className="home-question-owner">{question.owner.username}</h5>
                        <div className="home-question-meta">
                            {/* Date */}
                            <h5 className="home-question-date">{moment(question.createdAt).format('MMMM Do YYYY, h:mm a')}</h5>
                            {/* # of comments */}
                            <h5 className="home-question-comments">{question.comments.length} comments</h5>
                            {/* # of upvotes */}
                            <h5 className="home-question-upvotes">Upvotes: {question.upvotes}</h5>
                        </div>
                    </div>
                )
            })
        }


        return (
            <div className="home-content-container">
                <div className="home-querySection">
                    <h1>{term}:</h1>
                    <select onChange={this.handleDrop}>
                        <option>Most Recent</option>
                        <option>Top Rated</option>
                    </select>
                </div>
                {questionReturn}
            </div>
        )
    }
}