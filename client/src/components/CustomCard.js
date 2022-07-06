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
// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));


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
  const [expanded, setExpanded] = React.useState(false);

  const [status, setStatus] = React.useState();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box sx={{
        display: 'flex',
      }}>
        <Box sx={{ display: 'flex', height: '70px', alignItems: 'center', justifyContent: 'center', }}>
          <Box sx={{ backgroundColor: 'green', height: '30px', width: '30px', borderRadius: '100px', margin: '15px' }}>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 2 }}>
          <Box>
            Title
          </Box>
          <Box>
            Issue id: #3761
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Status
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
            <IconButton aria-label="delete"

              sx={{ '&:hover': { backgroundColor: 'rgba(0, 128, 0, 0.151)' } }}

            >
              <ThumbUpAltOutlinedIcon sx={{ transform: 'scale(1.5)', color: 'green' }} />
            </IconButton>
          </Box>
          <Box sx={{ boxShadow: '10px',  display : 'flex'}}>
            <IconButton aria-label="delete"

              sx={{ '&:hover': { backgroundColor: 'rgba(0, 128, 0, 0.151)' } }}

            >
              <ThumbDownOffAltOutlined sx={{ transform: 'scale(1.5)', color: 'green' }} />
            </IconButton>
          </Box>
          <Box>
            +123
          </Box>
        </Box>
        <Box sx = {{display : 'flex' , flexDirection : 'row'}}>
            <Box>
              Author :  
            </Box>
            <Box>
              Ankit Singh , 1914172
            </Box>
        </Box>
        <Box sx = {{display : 'flex' , flexDirection : 'row'}}>
            <Box>
              Date :   
            </Box>
            <Box>
              05-07-2022
            </Box>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <InfoIcon sx = {{color : '#1363DF' , transform : 'scale(1.1)'}} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon   sx = {{color : '#1363DF'}} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
