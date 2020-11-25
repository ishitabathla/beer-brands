import './App.css';
import { useState, useEffect } from 'react';
import {
  CircularProgress,
  Typography,
  TextField,
  Button,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from './List';

const styles = makeStyles(() => ({
  main: {
    display:'flex',
    justifyContent:'center',
    margin:'30px 10px',
    width:'50%',
  },
  btnSection:{
    display:'flex',
    justifyContent:'space-between',
  },
  reset:{
    marginLeft:10,
    backgroundColor:'#6e0b1c',
    color:'#FFFFFF'
  },
  title:{
    textAlign:'center',
    marginTop:20,
    fontFamily:'fangsong'
  },
  body:{
    backgroundColor:'#FFFFBF',
  },
  table:{
    backgroundColor:'#FFFFFF'
  },
  primaryBtn:{
    backgroundColor:'#e47e24',
    color:'#FFFFFF'
  },
}));
function App() {
  const classes = styles();
  const [load, setLoad] = useState(true);
  const [brandList, setBrandList] = useState([]);
  const [search, setSearch] = useState("");
  const [page,setPage] = useState(0);
  const [ rowsPerPage,setRowsPerPage] = useState(20)
  useEffect(() => {
    getStudentsAndScores()
  .then(([pictures, brands]) => {
          let demo = 0;
          let resultIm = "";
          const count = pictures.length;
          const data = brands.map((item,index)=>{
            if(demo < count){
              resultIm = pictures[demo];
              demo = demo + 1;
            }else{
              demo = 0;
              resultIm = pictures[demo];
              demo = demo + 1;
            }
            return {...item,image: resultIm ? resultIm.image :''};
          })

          setBrandList(data);
          setLoad(false);
  })
  }, []);

  const fetchPictures=()=>{
    return fetch(
      'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json'
    )
      .then((res) => res.json());
  }
  const fetchBrands=()=>{
   return fetch(
      'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json'
    )
      .then((res) => res.json());
  }
  function getStudentsAndScores(){
    return Promise.all([fetchPictures(), fetchBrands()])
  }

  const handleSearch=({target:{value}})=>{
    setSearch(value);
  }
  const handleSearchClick=()=>{
    const searchedResults = brandList.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()));
    setBrandList(searchedResults);
  }
  const handleReset=()=>{
    setSearch('');
    fetchBrands();
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Grid container justify="center" className={classes.body}>
      <Grid item sm={10}>
      {load ? (
        <CircularProgress />
      ) :
        <div>
          <Typography variant="h4" className={classes.title}>We sell Beers, So Cheers!</Typography>
          <div className={classes.main}>
              <TextField
                variant="outlined"
                value={search}
                onChange={handleSearch}
                placeholder="Search Brand"
                fullWidth
              />
            <div className={classes.btnSection}>
              <Button
                variant="contained"
                className={classes.primaryBtn}
                onClick={handleSearchClick}
              >
                Search
              </Button>
              <Button
                variant="contained"
                onClick={handleReset}
                className={classes.reset}
              >
                Reset
              </Button>
            </div>
          </div>
          { brandList.length > 0 ? (
          <List
            classes={classes}
            brandList={brandList}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />) : (
            'No Result Found.'
          )}
        </div>
      }
      </Grid>
    </Grid>
  );
}

export default App;
