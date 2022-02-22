import React, { useState, useEffect } from 'react';
import { ReviewProps } from '../../App';
import { collection, getDocs } from 'firebase/firestore';
import { db, reviewRef } from '../../firebaseConfig';
import './Reviews.scss';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import { Link } from 'react-router-dom';
import { Review } from '../../models/review';
import { Bakery } from '../../models/bakery';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 450,
    },
  },
};

function Reviews(props: ReviewProps) {
  const [bakeries, setBakeries] = useState<Bakery[]>([]);

  useEffect(() => {
    if (bakeries.length == 0)
      Bakery.all()
        .then((bakeries) => setBakeries(bakeries))
        .catch((e) => console.error('error fetching bakeries'));
  }, [bakeries]);

  const theme = useTheme();
  return (
    <>
      {bakeries.map((bakery) => (
        <Card
          className="cardContainer"
          sx={{ display: 'flex' }}
          key={bakery.name}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                <Link to={'/bakeries/' + bakery.url()}>{bakery.name}</Link>
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </>
  );
}

export default Reviews;

// <div className="wrapperDiv">
//       <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
//         <InputLabel id="demo-multiple-checkbox-label">Leta bageri</InputLabel>
//         <Select
//           labelId="demo-multiple-checkbox-label"
//           id="demo-multiple-checkbox"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Leta bageri" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//         >
//           {reviews.map((item) => (
//             <MenuItem key={item.nameOfBakery} value={item.nameOfBakery}>
//               <Checkbox checked={personName.indexOf(item.nameOfBakery) > -1} />
//               <ListItemText primary={item.nameOfBakery} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {reviews.map((item) => (
//         <Card
//           className="cardContainer"
//           sx={{ display: 'flex' }}
//           key={item.nameOfBakery}
//         >
//           <CardMedia
//             className="cardImg"
//             component="img"
//             sx={{ width: 151 }}
//             image={item.imageUrl || ''}
//             alt="Semla"
//           />
//           <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//             <CardContent sx={{ flex: '1 0 auto' }}>
//               <Typography component="div" variant="h5">
//                 {item.nameOfBakery}
//               </Typography>
//               {/* <Typography
//                 variant="subtitle1"
//                 color="text.secondary"
//                 component="div"
//               >
//                 {item.score} */}
//               <Box
//                 sx={{
//                   '& > legend': { mt: 2 },
//                 }}
//               >
//                 <Typography component="legend"></Typography>
//                 <Rating
//                   name="customized-10"
//                   value={item.score}
//                   max={10}
//                   readOnly
//                 />
//               </Box>

//               {/* </Typography> */}
//               <Typography
//                 variant="subtitle1"
//                 color="text.secondary"
//                 component="div"
//               >
//                 {item.review}
//               </Typography>
//             </CardContent>
//             <Box
//               sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
//             ></Box>
//           </Box>
//         </Card>
//       ))}
//     </div>
