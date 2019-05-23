import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom"

import red from '@material-ui/core/colors/red'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import Person from '@material-ui/icons/Person'
import Create from '@material-ui/icons/Create'
import Delete from '@material-ui/icons/Delete'
import Comment from '@material-ui/icons/Comment'

const styles = theme => ({
	card: {
		width: "100%",
		margin: "15px 10px"
    },
    link: {
        textDecoration: "none"
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
    body: {
        margin: "15px 0"
    }
})


class Post extends Component {
    
	render() {
        const { classes, post, onUpVote, onDownVote, onDeletePost, commentsCount } = this.props
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <Link className={classes.link} to={`/${post.category}/${post.id}`}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {post.title}
                            </Typography>
                            <Typography className={classes.author} gutterBottom component="p">
                                <Person className={classes.leftIcon} />
                                {post.author}
                            </Typography>
                            {post.body && (
                                <Typography className={classes.body} gutterBottom component="p">
                                    {post.body}
                                </Typography>
                            )}
                        </CardContent>
                    </Link>
                </CardActionArea>
                <CardActions>
                    <Button size="small" className={classes.downVote} onClick={() => { onDownVote(post.id) }}>
                        <ArrowDropDown />
                    </Button>
                    <Typography gutterBottom component="span">
                        {post.voteScore}
                    </Typography>
                    <Button size="small" className={classes.upVote} onClick={() => { onUpVote(post.id) }}>
                        <ArrowDropUp />
                    </Button>
                    <Button size="small" className={classes.downVote}>
                        <Comment className={classes.leftIcon}/> {commentsCount} Comments
                    </Button>
                    <div className={classes.actionButtons}>
                        <Button size="small" className={classes.deleteButton} onClick={() => { onDeletePost(post.id) }}>
                            <Delete className={classes.leftIcon} />
                            Delete Post
                        </Button>
                        <Link to={`/edit/${post.id}`} className={classes.link}>
                            <Button size="small" color="primary" >
                                <Create className={classes.leftIcon} />
                                Edit Post
                            </Button>
                        </Link>
                    </div>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(Post)