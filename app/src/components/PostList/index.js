import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import Post from '../Post'

import * as actions from '../../actions'

import Grid from '@material-ui/core/Grid'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Create from '@material-ui/icons/Create'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    root: {
		flexGrow: 1,
        maxWidth: 700,
        margin: "95px auto"
    },
    createButton: {
		padding: "14px 24px",
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
    },
    actionsTop: {
        marginBottom: 20
    }
})

//Variable that holds the values of the dropdown sort menu.
const sortOptions = [
    { value: "popular", name: "Popular" },
    { value: "unpopular", name: "Unpopular" },
    { value: "oldest", name: "Oldest" },
    { value: "newest", name: "Newest" }
]

class PostList extends Component {

    state = {
        sortValue: ""
    }
    
    componentDidMount() {
        const { fetchPosts, fetchPostsCategory, match } = this.props
        const { params } = match
        if (params.category) {
            fetchPostsCategory(params.category)
        } else {
            fetchPosts()
        }
    }

    componentDidUpdate(prevProps) {
        const { fetchPosts, fetchPostsCategory, match } = this.props
        const { params } = match
        if (prevProps.match.params !== params) {
            if (params.category) {
                fetchPostsCategory(params.category)
            } else {
                fetchPosts()
            }
        }
    }

    handleDeletePost = (postId) => {
        const { fetchDeletePost } = this.props
        fetchDeletePost(postId)
    }

    handleUpVote = (postId) => {
        const { fetchVotePost } = this.props
        fetchVotePost(postId, "upVote")
    }

    handleDownVote = (postId) => {
        const { fetchVotePost } = this.props
        fetchVotePost(postId, "downVote")
    }

    setSort = (e, data) => {
        this.setState({ sortValue: data.props.value });
        this.props.changeSortAction({ value: data.props.value });
    }

    render() {
        const { classes } = this.props
        const { posts } = this.props.posts
        const { sort } = this.props.sort
        return (
            <Grid container className={classes.root} direction="row" justify="center" alignItems="center">
                <Grid className={classes.actionsTop} container direction="row" justify="flex-end" alignItems="center">
                    <Link className={classes.link} to={`/create`}>
                        <Button variant="contained" color="primary" className={classes.createButton} size="large">
                            <Create className={classes.leftIcon} />
                            Create post
                        </Button>
                    </Link>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef = ref
                            }}
                            htmlFor="outlined-age-simple"
                        >
                            Sort by
                        </InputLabel>
                        <Select
                            value={this.state.sortValue}
                            onChange={this.setSort}
                            input={
                                <OutlinedInput
                                    labelWidth={0}
                                    name="age"
                                    id="outlined-age-simple"
                                />
                            }
                        >
                            {sortOptions.map(s => (
                                <MenuItem key={s.value} value={s.value}>
                                    {s.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">		
                    {(posts && posts.length > 0) ? (
                        posts.sort((a, b) => {
                            switch (sort.value) {
                                case "unpopular":
                                    return a.voteScore - b.voteScore
                                case "oldest":
                                    return a.timestamp - b.timestamp
                                case "newest":
                                    return b.timestamp - a.timestamp
                                default:
                                    return b.voteScore - a.voteScore
                            }
                        })
                        .map(post => (
                            <Post
                                key={post.id}
                                post={post}
                                onUpVote={this.handleUpVote}
                                onDownVote={this.handleDownVote}
                                onDeletePost={this.handleDeletePost}
                                commentsCount={post.commentCount}
                            />
                        ))
                    ) : (
                        <Grid container direction="row" justify="center" alignItems="center">	
                            No posts available
                        </Grid>
                    )}
                </Grid>
            </Grid>
        ) 
    }
}

const mapStateToProps = ({ posts, sort }) => ({
    posts,
    sort
})

export default withRouter(
    compose(
        withStyles(styles, { withTheme: true }),
        connect(mapStateToProps, actions)
    )(PostList)
)
