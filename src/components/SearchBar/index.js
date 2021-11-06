import { useHistory } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    header: {
      padding: "6px 0",
    },
    headerBackground: {
      backgroundColor: '#0065C1',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    search: {
      position: 'relative',
    //   borderRadius: 50,
      backgroundColor: alpha(theme.palette.common.white, 0.95),
    //   '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.75),
    //   },
      color: 'black',
  
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: 0,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const history = useHistory();

    const classes = useStyles();

    const onSubmit = (e, value) => {
        setSearchQuery(value)
        history.push(`?s=${value}`);
        e.preventDefault();
    };
    

    return (
        <form
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >

             <div className={`${classes.search} rounded-xl space-x-16 h-10 md:mr-4 flex`}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                    {/* <InputBase
                        placeholder="Bạn muốn tìm kiếm gì...?"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    /> */}
                    <input
                        value={searchQuery}
                        onInput={(e) => onSubmit(e, e.target.value)}
                        type="text"
                        id="header-search"
                        placeholder="Bạn muốn tìm kiếm gì...?"
                        name="s"
                        className={`text-black ${classes.inputInput} rounded-2xl outline-none`}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
          </div>
            {/* <label htmlFor="header-search">
                <span className="visually-hidden">
                    Search blog posts
                </span>
            </label>
            <input
                value={searchQuery}
                onInput={(e) => onSubmit(e, e.target.value)}
                type="text"
                id="header-search"
                placeholder="Search blog posts"
                name="s"
                className="text-black"
            /> */}
            {/* <button type="submit">Search</button> */}
        </form>
    );
};

export default SearchBar;