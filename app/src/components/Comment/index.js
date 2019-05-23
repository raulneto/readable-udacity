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

const styles = theme => ({
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
    link: {
        textDecoration: "none"
    }
})

class Comment extends Component {
	render() {
        const { classes, comment, onUpVote, onDownVote, onDelete } = this.props
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography className={classes.author} gutterBottom component="p">
                            <Person className={classes.leftIcon} />
                            {comment.author}
                        </Typography>
                        <Typography className={classes.author} gutterBottom component="p">
                            {comment.body}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" className={classes.downVote} onClick={() => { onDownVote(comment.id) }}>
                        <ArrowDropDown />
                    </Button>
                    <Typography gutterBottom component="span">
                        {comment.voteScore}
                    </Typography>
                    <Button size="small" className={classes.upVote} onClick={() => { onUpVote(comment.id) }}>
                        <ArrowDropUp />
                    </Button>
                    <div className={classes.actionButtons}>
                        <Button size="small" className={classes.deleteButton} onClick={() => { onDelete(comment.id) }}>
                            <Delete className={classes.leftIcon} />
                            Delete Comment
                        </Button>
                        <Link to={`/edit/comment/${comment.id}`} className={classes.link}>
                            <Button size="small" color="primary" >
                                <Create className={classes.leftIcon} />
                                Edit Comment
                            </Button>
                        </Link>
                    </div>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(Comment)