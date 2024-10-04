
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
// import defaultPhoto from '../lib/defaultPhoto'

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '80% !important', // Overrides inline-style
    height: 150,
    marginLeft: '10%'
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function MenuButton({category}) {
    const navigate = useNavigate();
    // const photoUrl = category.photo_url?.length ? category.photo_url : defaultPhoto[category.name]
    // const backgroundImage = category.photo_url?.length ? `url(${category.photo_url})` : defaultPhoto[category.name];

    return (
    <ImageButton
      focusRipple
      style={{
        width: '30%',
      }}
      onClick={() => navigate(`/order/${category.name.toLowerCase()}`)}
    >
      <ImageSrc className={`menu_button_img_${category.name}`} /*style={{ backgroundImage }}*/ />
      <ImageBackdrop className="MuiImageBackdrop-root" />
      <Image>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          sx={(theme) => ({
            position: 'relative',
            p: 4,
            pt: 2,
            pb: `calc(${theme.spacing(1)} + 6px)`,
          })}
        >
          {category.name}
          <ImageMarked className="MuiImageMarked-root" />
        </Typography>
      </Image>
    </ImageButton>
  );
}
