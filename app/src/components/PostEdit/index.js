import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'
import uuidv1 from "uuid/v1"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AddCircle from '@material-ui/icons/AddCircle'

import Grid from '@material-ui/core/Grid'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

import { fetchEditPost, fetchSinglePost, fetchAddPost } from "../../actions"

const categories = [
    { key: 1, name: "React", value: "react" },
    { key: 2, name: "Redux", value: "redux" },
    { key: 3, name: "Udacity", value: "udacity" },
    { key: 4, name: "Javascript", value: "javascript" }
]

const styles = theme => ({
    root: {
		flexGrow: 1,
        maxWidth: 700,
        margin: "95px auto"
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
    },
    formControlCategory: {
		margin: theme.spacing.unit,
		width: "100%"
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "100%"
    },
    createButton: {
		padding: "14px 24px",
		marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        textDecoration: 'none'
	},
})

class PostEdit extends Component {

    state = {
        id: uuidv1(),
        postCategory: "",
        postTitle: "",
        postAuthor: "",
        postContent: ""
    }

    componentDidMount() {
        const { match, fetchSinglePost } = this.props
        const { postId } = match.params

        if (postId) {
            fetchSinglePost(postId).then((post) => {
                const { posts } = post
                this.setState({
                    id: posts.id,
                    postTitle: posts.title,
                    postAuthor: posts.author,
                    postContent: posts.body,
                    postCategory: posts.category
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

    setPostCategory = (e, data) => {
        this.setState({ postCategory: data.props.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { id, postTitle, postCategory, postContent, postAuthor } = this.state
        const { fetchEditPost, fetchAddPost, history, match } = this.props
        const { params } = match
        const data = {
            id: id,
            title: postTitle,
            body: postContent,
            author: postAuthor,
            category: postCategory
        }
        if (params.postId) {
            fetchEditPost(data, data.id)
        } else {
            fetchAddPost(data)
        }
        history.goBack()
    }

	render() {
        const { classes, match } = this.props
        const { postCategory, postTitle, postAuthor, postContent } = this.state
        const { params } = match
        return (
            <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
                <Typography className={classes.titles} gutterBottom variant="h5" component="h2">
                    {params.postId ? `Edit post` : 'Create post'}
                </Typography>
                <form onSubmit={this.handleSubmit}  autoComplete="off">
                    <FormControl variant="filled" className={classes.formControlCategory}>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef = ref
                            }}
                            htmlFor="outlined-category"
                        >
                            Category
                        </InputLabel>
                        <Select
                            value={postCategory}
                            onChange={this.setPostCategory}
                            input={
                                <OutlinedInput
                                    labelWidth={0}
                                    name="category"
                                    id="outlined-category"
                                />
                            }
                        >
                            {categories.map(c => (
                                <MenuItem key={c.key} value={c.value}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Title"
                        className={classes.textField}
                        value={postTitle}
                        name="postTitle"
                        onChange={this.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        required={true}
                    />
                    <TextField
                        label="Author"
                        className={classes.textField}
                        value={postAuthor}
                        name="postAuthor"
                        onChange={this.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        required={true}
                    />
                    <TextField
                        label="Text"
                        className={classes.textField}
                        value={postContent}
                        name="postContent"
                        onChange={this.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        required={true}
                        multiline={true}
                        rows={7}
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.createButton} size="large">
                        <AddCircle className={classes.leftIcon} />
                        {params.postId ? `Edit post` : 'Create post'}
                    </Button>
                </form>
            </Grid>
        )
    }
}

const mapStateToProps = ({ posts }) => ({
    posts
})

export default withRouter(
    compose(
        withStyles(styles, { withTheme: true }),
        connect(mapStateToProps, { fetchEditPost, fetchSinglePost, fetchAddPost })
    )(PostEdit)
)