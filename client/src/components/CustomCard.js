import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownOffAltOutlined from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useSelector } from 'react-redux';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


// .status {
//   padding: 5px;
//   border-radius: 5px;

//   &.Approved {
//     color: green;
//     background-color: rgba(0, 128, 0, 0.151);
//   }
//   &.Pending {
//     color: goldenrod;
//     background-color: rgba(189, 189, 3, 0.103);
//   }
// }



export default function CustomCard(props) {
  // console.log("props: " ,props);
  const [expanded, setExpanded] = React.useState(false);

  const user = useSelector( ( state) => state.loginSlice.user );

  const issues = useSelector( (state) => state.issue.issues );
  
  // console.log(props.status);
  let flaglike = false;

let flLike  = false;

let flDislike = false;


  

  const [status, setStatus] = React.useState();

  const handleExpandClick = () => {
    setExpanded(!expanded);
    console.log("Expanded");
  };

  

  const idx = issues.findIndex( (issue) => issue.id===props.id );



  let likes = JSON.parse(JSON.stringify(issues[idx].likes));

  const [likess, setLikes] = React.useState(likes);

  console.log('likess: ',likess, issues[idx].id);
  // let liked  = JSON.parse(JSON.stringify(likes[0]));
  // let disliked = JSON.parse(JSON.stringify(likes[1]));
  
  
  const [flag, setFlag] = React.useState(false);
  
  if(issues[0].likes.length > 0){

  if(issues[idx].likes[0].includes(user[0].scholarid)){
    flLike = true;
  }

  if(issues[idx].likes[1].includes(user[0].scholarid)){
    flDislike = true;
  }
  }
  const[ifLiked, setifLiked] = React.useState(flLike);

  const [ifDisliked, setifDisliked] = React.useState(flDislike);

  const handleLikeButton = () => {
    if(!ifDisliked && !ifLiked){
      
        let arr1 = JSON.parse(JSON.stringify(likess[0]));
        arr1.push(user[0].scholarid);
        let arr2 =  JSON.parse(JSON.stringify(likess[1]));
        let arr = [[...arr1], [...arr2]];

        setLikes(arr);
        console.log( likess);
        setifLiked(true);
    }
    else if(ifLiked){
      
      let arr1 =  likess[0].filter( (item) => item!==user[0].scholarid );
      let arr2 = JSON.parse(JSON.stringify(likess[1]));
      let arr  = [ [...arr1], [...arr2] ];
      setLikes(arr);
      console.log('upating from filter: ', likess);
      setifLiked(false);
    }
  }

  const handleDislikeButton = () => {
    if(!ifLiked && !ifDisliked){
    console.log("Hello from dislike button")

      let arr1 = JSON.parse(JSON.stringify(likess[1]));
      arr1.push(user[0].scholarid);
      let arr2 = JSON.parse(JSON.stringify(likess[0]));
      let arr= [ [...arr2], [...arr1] ];

      setLikes(arr);
      console.log(likess);
      setifDisliked(true);
    }

    else if(ifDisliked){
      let arr1 =  likess[1].filter( (item) => item!==user[0].scholarid );
      let arr2 = JSON.parse(JSON.stringify(likess[0]));
      let arr  = [ [...arr2], [...arr1] ];
      setLikes(arr);
      console.log('upating from filter: ', likess);
      setifDisliked(false);
    }
  }


  React.useEffect(() => {

    const updateLike = async () => {
      console.log(likess, 'from updatelike function')
      const res = await fetch('/updateLike', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          likes: likess,
          id: issues[idx].id
        })
      });

      if(!res.ok){
        throw new Error('Couldn\'t be liked');
      }
    }



    if (flag && ifLiked) {
      
      try{
         updateLike();
      }
      catch(err){
        console.log(err);
      }


    }
    if(flag && !ifLiked){
      try{
         updateLike();
      }
      catch(err){
        console.log(err);
      }
    }
    

   setFlag(true);
  }
    , [ifLiked, likess, idx, issues, flLike, ifDisliked, flag])

  return (
    <Card sx={{ maxWidth: 360, minWidth : 360 , borderRadius : '10px'}}>
      <Box sx={{
        display: 'flex',
      }}>
        <Box sx={{ display: 'flex', height: '70px', alignItems: 'center', justifyContent: 'center', }}>
          <Box sx={{  height: '30px', width: '30px', borderRadius: '100px', margin: '15px',
           ...(props.status==='Active' && {color : 'goldenrod' , backgroundColor: 'goldenrod'} ),
           ...(props.status==='Solved' && {color : 'green' , backgroundColor : 'green'}),
        }}>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 2 }}>
          <Box>
            {props.title}
          </Box>
          <Box>
            {'Issue id: #' + props.id}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
          <Box sx = {{height: 'max-content', padding: '2px 3px 2px 3px',
        ...(props.status==='Active' && {color : 'goldenrod' , backgroundColor: 'rgba(189, 189, 3, 0.103)'} ),
        ...(props.status==='Solved' && {color : 'green' , backgroundColor : 'rgba(0, 128, 0, 0.151)'}),
        }}>
          {props.status}
          </Box>
        </Box>
      </Box>
      <CardMedia
        component="img"
        height="194"
        image={props.imgsrc}
        alt="issue image"
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row'  , alignItems: 'center'}}>
          <Box sx={{ boxShadow: '10px' , display : 'flex'}}>
            <IconButton aria-label="Dislike"  onClick = {handleLikeButton}

              sx={{ '&:hover': { backgroundColor: 'rgba(0, 128, 0, 0.151)' } }}

            >{ifLiked ? <ThumbUpIcon sx={{ transform: 'scale(1.5)', color: 'green' }} /> : 
            <ThumbUpAltOutlinedIcon sx={{ transform: 'scale(1.5)', color: 'green' }} />
            }
             
            </IconButton>
          </Box>
          <Box sx={{ boxShadow: '10px',  display : 'flex'}}>
            <IconButton aria-label="Dislike" onClick = {handleDislikeButton}

              sx={{ '&:hover': { backgroundColor: 'rgba(0, 128, 0, 0.151)' } }}

            >
              {ifDisliked ? <ThumbDownIcon sx={{ transform: 'scale(1.5)', color: 'green' }} /> : 
                <ThumbDownOffAltOutlined sx={{ transform: 'scale(1.5)', color: 'green' }} />
              }
              
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex' , margin: '0 0 0 8px' }}>
            {likess[0].length - likess[1].length}
          </Box>
        </Box>
        <Box sx = {{display : 'flex' , flexDirection : 'row'}}>
            <Box>
              Author :  
            </Box>
            <Box>
              { (props.authorname) + ', ' + props.author}
            </Box>
        </Box>
        <Box sx = {{display : 'flex' , flexDirection : 'row'}}>
            <Box>
              Date :   
            </Box>
            <Box>
              {props.creationdate}
            </Box>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <InfoIcon sx = {{color : '#1363DF' , transform : 'scale(1.1)'}} onClick={handleExpandClick} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon   sx = {{color : '#1363DF'}} />
        </IconButton>
      </CardActions>


      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
            {props.description}
          </Typography>
        </CardContent>
      </Collapse>

    </Card>
  );
}
