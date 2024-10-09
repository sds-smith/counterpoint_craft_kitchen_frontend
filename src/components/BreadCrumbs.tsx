import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BreadCrumbs() {
  const { pathname } = useLocation();
  const breadcrumbTrail: string[] = ['home', ...pathname.split('/').filter(e => e)];
  const lastIdx: number = breadcrumbTrail.length - 1;
      
  let url = ""
  const to = ["", ...breadcrumbTrail.slice(1)].map((bc, i) => {
    url += i === 1 ? bc : `/${bc}`
    return url
  })

  return (
    <>
      { breadcrumbTrail.length > 1
        ? <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon/>}>
              { breadcrumbTrail.map((breadcrumb: string, index: number) => {
                const label = breadcrumb.replaceAll('_', ' ');
                return index === lastIdx
                ? <Typography key={breadcrumb} sx={{ color: 'text.primary' }}>{label}</Typography>
                : <Link key={breadcrumb} className='breadcrumb_link' to={to[index]}>
                  { label }
                  </Link>
              })}
            </Breadcrumbs>
          </div>
        : null
      }
    </>
  );
}
