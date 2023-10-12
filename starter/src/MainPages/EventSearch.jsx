import { Input, Box, IconButton, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const SearchInput = ({ changeFn, item, clearFn }) => (
  <Box align="center">
    <Input
      m="25px"
      placeholder="Search on event name"
      width="auto"
      borderColor="green"
      variant="filled"
      onChange={changeFn}
      {...item}
    />
    <InputRightElement>
      {item.value && ( 
        <IconButton
          icon={<CloseIcon />}
          aria-label="Clear input"
          onClick={clearFn}
        />
      )}
    </InputRightElement>
  </Box>
);
