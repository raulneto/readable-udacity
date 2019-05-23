import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    AppBar, Toolbar, Typography, List, ListItem,
    withStyles, Grid, SwipeableDrawer
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import {
    fetchPostsCategory,
    fetchCategories
} from "../../actions"

const styles = {
    list: {
        width: 200,
    },
    padding: {
        paddingRight: 30,
        cursor: "pointer",
    },

    sideBarIcon: {
        padding: 0,
        color: "white",
        cursor: "pointer",
    },
    link: {
        color: '#ffffff',
        textDecoration: 'none',
        textTransform: 'uppercase'
    },
    linkMobile: {
        color: 'black',
        textDecoration: 'none',
        textTransform: 'uppercase'
    }
}

class MainAppBar extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            drawerActivate: false, 
            drawer: false 
        }
        this.createDrawer = this.createDrawer.bind(this)
        this.destroyDrawer = this.destroyDrawer.bind(this)
    }

    //Get all the categories, to display in the Menu.
    componentDidMount() {
        this.props.fetchCategories()
    }

    //Dispatches action to get the posts for a category, when clicking on a Menu Button.
    getPostsByCategory = category => {
        this.props.fetchPostsCategory(category)
    }

    componentWillMount() {
        if (window.innerWidth <= 600) {
            this.setState({ drawerActivate: true })
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 600) {
                this.setState({ drawerActivate: true })
            }
            else {
                this.setState({ drawerActivate: false })
            }
        })
    }

    createDrawer() {
        const { classes, receiveCategories, fetchPostsCategory } = this.props
        const categories = receiveCategories
        return (
            <div>
                <AppBar >
                    <Toolbar>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <MenuIcon
                                className={classes.sideBarIcon}
                                onClick={() => { this.setState({ drawer: true }) }} />

                            <Typography color="inherit" variant="headline">
                                <Link className={classes.link} to={`/`}>Readable - Udacity</Link>
                            </Typography>
                            <Typography color="inherit" variant="headline"></Typography>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.state.drawer}
                    onClose={() => { this.setState({ drawer: false }) }}
                    onOpen={() => { this.setState({ drawer: true }) }}>

                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => { this.setState({ drawer: false }) }}
                        onKeyDown={() => { this.setState({ drawer: false }) }}>
                        
                        <List className={classes.list}>
                            {categories.length > 0 &&
                                categories.map(category => (
                                <ListItem key={category.id} button divider onClick={() => fetchPostsCategory(category.name) }>
                                    <Link className={classes.linkMobile} to={`/${category.name}`}>{category.name}</Link>
                                </ListItem>
                            ))}
                        </List>

                    </div>
                </SwipeableDrawer>

            </div>
        )
    }

    destroyDrawer() {
        const { classes, receiveCategories, fetchPostsCategory } = this.props
        const categories = receiveCategories
        return (
            <AppBar>
                <Toolbar>
                    <Typography variant="headline" style={{ flexGrow: 1 }} color="inherit" >
                        <Link className={classes.link} to={`/`}>Readable - Udacity</Link>
                    </Typography>
                    {categories.length > 0 &&
                        categories.map(category => (
                            <Typography onClick={() => fetchPostsCategory(category.name) } key={category.id} variant="subheading" className={classes.padding} color="inherit" >
                                <Link className={classes.link} to={`/${category.name}`}>{category.name}</Link>
                            </Typography>
                    ))}
                </Toolbar>
            </AppBar>
        )
    }

    render() {
        return (
            <div>
                {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
            </div>
        )
    }
}

MainAppBar.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = ({ receiveCategories }) => ({
    receiveCategories
})

const mapDispatchToProps = dispatch => ({
    fetchPostsCategory: (categoryId) => dispatch(fetchPostsCategory(categoryId)),
    fetchCategories: () => dispatch(fetchCategories())
})


export default withRouter(
    compose(
        withStyles(styles, { withTheme: true }),
        connect(mapStateToProps, mapDispatchToProps)
    )(MainAppBar)
)
