import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDemo({onCartegoryHandler}) {

  const onChangeHandler = (e) => {
    onCartegoryHandler(e.target.value);
  }
  
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          카테고리
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'carta',
            id: 'uncontrolled-native',
          }}
          onChange={onChangeHandler}
        >
          <option value="all">전체</option>
          <option value="아케이드">아케이드</option>
          <option value="로그라이크">로그라이크</option>
          <option value="RPG">RPG</option>
          <option value="기타">기타</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
