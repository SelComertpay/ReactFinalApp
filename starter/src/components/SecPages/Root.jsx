import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Box } from '@chakra-ui/react';

export const Root = () => {
  return (
    <Box bgColor={"gray.100"}>
      <Navigation />
      
      <Outlet />
    </Box>
  );
};



