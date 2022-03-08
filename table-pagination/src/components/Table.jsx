import React from 'react';
import styled from 'styled-components'
import TablePaginationActions from './TablePagination';
import { Checkbox, Table as Mtable, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core'

const Container = styled.div`
  padding: 30px;
`;

const Table = (props) => {
  const { columns, datas, page, handleChangePage, totalCount, isSelected, onChecked, selectCount = 0, onAllCheck, allChecked } = props;
  return (
    <Container>
      <div>
        select count : {selectCount}
      </div>
      <Mtable>
        <TableHead>
          {console.log('presenter : ', allChecked)}
          <TableRow>
            <TableCell padding='checkbox'><Checkbox onClick={onAllCheck} checked={allChecked}/></TableCell>
            {columns.lenght !==0 && columns.map(column => (
              <TableCell id={column} align="center">{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.lenght !== 0 && datas.map(data=> {
            // const isItemSelected = isSelected(data.id);
            return (
            <TableRow key={data[columns[0]]} >
              <TableCell padding='checkbox'><Checkbox checked={isSelected(data)} onClick={(event)=>onChecked(event, data)}/></TableCell>
              {columns.lenght !== 0 && columns.map(column => (
                <TableCell key={column} align="center">{data[column]}</TableCell>
              ))}
            </TableRow>
          )
          })}
        </TableBody>
      </Mtable>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={totalCount}
        rowsPerPage={15}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onPageChange={handleChangePage}
        ActionsComponent={TablePaginationActions}
      />
    </Container>
  );
};

export default Table;