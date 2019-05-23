import React, { Component, Fragment } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Post from '../Post'
import Comment from '../Comment'
import CommentEdit from '../CommentEdit'
import {
    fetchSinglePost,
    fetchComments,
    fetchDeletePost,
    fetchDeleteComment,
    fetchVoteComment,
    fetchVotePost
} from "../../actions"

const styles = theme => ({
    root: {
		flexGrow: 1,
        maxWidth: 700,
        margin: "95px auto"
	},
    titles: {
        textAlign: 'left',
        margin: "20px 0 10px"
    }
})


class PostDetail extends Component {
    componentDidMount() {
        const { match, fetchPost } = this.props
        const { params } = match
        const { postId } = params
        fetchPost(postId)
    }
    
    handleDeletePost = (postId) => {
        const { deletePost, history } = this.props
        deletePost(postId)
        history.goBack()
    }
    
    handleDeleteComment = (commentId) => {
        const { deleteComment } = this.props
        deleteComment(commentId)
    }

    handleUpVote = (postId, option) => {
        const { votePost } = this.props
        votePost(postId, "upVote")
    }
    
    handleDownVote = (postId, option) => {
        const { votePost } = this.props
        votePost(postId, "downVote")
    }

    handleDownVoteComment = (commentId) => {
        const { voteComment } = this.props
        voteComment(commentId, "downVote")
    }
    
    handleUpVoteComment = (commentId) => {
        const { voteComment } = this.props
        voteComment(commentId, "upVote")
    }

	render() {
        const { classes, posts, getComments } = this.props
        const { comments } = getComments
        const commentsCount = comments ? comments.length : 0
        const post = posts && Object.keys(posts).length > 0 ? 
                        posts['posts'].filter(post => !post.deleted && Object.keys(post).length > 0 && !post.error)[0]
                        :
                        null
        return (
            <Grid container className={classes.root} direction="row" justify="center" alignItems="center">
                {post ? (
                    <Fragment>
                        <Grid container direction="row" justify="center" alignItems="center">	
                            <Post
                                post={posts.posts[0]}
                                onUpVote={this.handleUpVote}
                                onDownVote={this.handleDownVote}
                                onDeletePost={this.handleDeletePost}
                                commentsCount={commentsCount}
                            />
                        </Grid>
                        {(comments && comments.length > 0) && (
                            <Fragment>
                                <Typography className={classes.titles} gutterBottom variant="h5" component="h2">
                                    Comments
                                </Typography>
                                {comments.map(comment => (
                                    <Comment
                                        key={comment.id}
                                        comment={comment}
                                        onUpVote={this.handleUpVoteComment}
                                        onDownVote={this.handleDownVoteComment}
                                        onDelete={this.handleDeleteComment}
                                    />
                                ))}
                            </Fragment>
                        )}
                        <CommentEdit />
                    </Fragment>
                ) : (
                    <Grid container direction="row" justify="center" alignItems="center">	
                        Post not found
                    </Grid>
                )}
            </Grid>
            
        )
    }
}

const mapStateToProps = ({ posts, getComments, sort }) => ({
    posts,
    getComments,
    sort
})
  
const mapDispatchToProps = dispatch => ({
    fetchPost: (postId) =>
        dispatch(fetchSinglePost(postId))
            .then(() =>
                dispatch(fetchComments(postId))
    ),
    deletePost: (postId) => dispatch(fetchDeletePost(postId)),
    deleteComment: (commentId) => dispatch(fetchDeleteComment(commentId)),
    voteComment: (commentId, option) => dispatch(fetchVoteComment(commentId, option)),
    votePost: (postId, option) => dispatch(fetchVotePost(postId, option))
})

export default withRouter(
    compose(
        withStyles(styles, { withTheme: true }),
        connect(mapStateToProps, mapDispatchToProps)
    )(PostDetail)
)