import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'
import uuidv1 from "uuid/v1"

import red from '@material-ui/core/colors/red'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AddCircle from '@material-ui/icons/AddCircle'
import Typography from '@material-ui/core/Typography'

import {
    fetchComment,
    fetchAddComment,
    fetchEditComment
} from "../../actions"

const styles = theme => ({
    root: {
		flexGrow: 1,
        maxWidth: 700,
        margin: "95px auto"
	},
	card: {
		width: "100%",
		margin: "15px 10px"
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	deleteButton: {
		color: red[500]
	},
	upVote: {
		minWidth: "42px"
	},
	downVote: {
		minWidth: "42px"
	},
	actionButtons: {
		marginLeft: "auto"
	},
	author: {
		display: 'flex',
		alignItems: 'center'
    },
    textField: {
		width: "100%"
	},
})

class CommentEdit extends Component {
    state = {
        commentAuthor: "",
        commentContent: ""
    }
    
    componentDidMount() {
        const { match, fetchComment } = this.props
        const { params } = match
        if (params.commentId) {
            fetchComment(params.commentId).then((comment) => {
                const { comments } = comment
                this.setState({
                    commentAuthor: comments.author,
                    commentContent: comments.body
                })
            })
        }
    }
    
    handleInputChange = e => {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }
    
    handleSubmit = e => {
        e.preventDefault()
        const { commentContent, commentAuthor } = this.state
        const { history, match, receiveComment, fetchEditComment, fetchAddComment } = this.props
        const comment = receiveComment
        const { params } = match
        
        if (params.commentId) {
            const data = {
                id: comment.id,
                body: commentContent,
                author: commentAuthor
            }
            fetchEditComment(data, data.id)
            history.goBack()
        } else {
            const data = {
                id: uuidv1(),
                timestamp: Date.now(),
                body: this.state.commentContent,
                author: this.state.commentAuthor,
                parentId: params.postId,
                deleted: false,
                parentDeleted: false,
                voteScore: 0
            }
            fetchAddComment(data)
            this.setState({
                commentAuthor: "",
                commentContent: ""
            })
        }
    }

	render() {
        const { classes, match } = this.props
        const { commentAuthor, commentContent } = this.state
        const { params } = match
        return (
            <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
                <Typography className={classes.titles} gutterBottom variant="h5" component="h2">
                    {params.commentId ? `Edit comment` : 'Add a comment'}
                </Typography>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField
                        id="outlined-name"
                        label="Name"
                        name="commentAuthor"
                        className={classes.textField}
                        value={commentAuthor}
                        onChange={this.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        required={true}
                    />
                    <TextField
                        id="outlined-name"
                        label="Comment"
                        name="commentContent"
                        className={classes.textField}
                        value={commentContent}
                        onChange={this.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        required={true}
                        multiline={true}
                        rows={7}
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.createButton} size="large">
                        <AddCircle className={classes.leftIcon} />
                        {params.commentId ? `Edit comment` : 'Add comment'}
                    </Button>
                </form>
            </Grid>
        )
    }
}

const mapStateToProps = ({ receiveComment }) => ({
    receiveComment
})



export default withRouter(
    compose(
        withStyles(styles, { withTheme: true }),
        connect(mapStateToProps, { fetchAddComment, fetchEditComment, fetchComment })
    )(CommentEdit)
)