import React, { Component, Fragment } from 'react'
import { Route, Switch } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles'

import MainAppBar from './components/MainAppBar'
import PostDetail from './components/PostDetail'
import PostList from './components/PostList'
import PostEdit from './components/PostEdit'
import CommentEdit from './components/CommentEdit'


import red from '@material-ui/core/colors/red'


const styles = theme => ({
	root: {
		marginTop: 95,
		flexGrow: 1,
		maxWidth: 700,
		margin: "0 auto"
	},
	card: {
		width: "100%",
		margin: "15px 10px"
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
	formControlCategory: {
		margin: theme.spacing.unit,
		width: "100%"
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
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
})


class App extends Component {
	render() {
		return (
			<Fragment>
				<MainAppBar />
				<Switch>
					<Route exact path="/" component={PostList} />
					<Route exact path="/create" component={PostEdit} />
					<Route exact path="/edit/:postId" component={PostEdit} />
					<Route exact path="/edit/comment/:commentId" component={CommentEdit} />
					<Route exact path="/:category/:postId" component={PostDetail} />
					<Route exact path="/:category/" component={PostList} />
				</Switch>
				{/* <Grid container className={classes.root} direction="row" justify="center" alignItems="center">
					
					
					<Grid className={classes.wrapper} container direction="row" justify="flex-end" alignItems="flex-end">
						
					</Grid>
					
				</Grid> */}
			</Fragment>
		)
	}
}

export default withStyles(styles)(App)
