import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkOccurrence, requestTableData } from '../store/table';
import Table from '../components/Table'

const User = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(requestTableData())
  },[dispatch])

  const datas = useSelector(state=>state.table.user);
  const totalCount = useSelector(state=>state.table.userLen);
  const [columns, setColumns] = useState([]);
  const [selectedDatas, setSelectedDatas] = useState([]);

  useEffect(()=>{
    if ( datas.length !== 0) {
      setColumns(Object.keys(datas[0]))
    }
  }, [datas])

  const [page, setPage] = useState(0)

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
    dispatch(requestTableData(newPage))
  }
  
  const isSelected = (row) => selectedDatas.map(item => item.id).includes(row)

  const onChecked = (e, data) => {
    const selectedDataIndex = selectedDatas.indexOf(data);
    let newSelectedData = []

    // 값 유무 체크
    if (selectedDataIndex === -1) {
      newSelectedData = newSelectedData.concat(selectedDatas, data);
    } else if (selectedDataIndex === 0) {
      newSelectedData = newSelectedData.concat(selectedDatas.slice(1));
    } else if (selectedDataIndex === selectedDatas.length - 1) {
      newSelectedData = newSelectedData.concat(selectedDatas.slice(0, -1));
    } else if (selectedDataIndex > 0) {
      newSelectedData = newSelectedData.concat(
        selectedDatas.slice(0, selectedDataIndex),
        selectedDatas.slice(selectedDataIndex + 1),
      );
    }

    setSelectedDatas(newSelectedData);
  };

  useEffect(()=>{
    dispatch(checkOccurrence(selectedDatas))
  },[dispatch, selectedDatas])

  return (
    <>
      <h3>User</h3>
      <Table 
        columns={columns}
        datas={datas}
        page={page}
        handleChangePage={handleChangePage}
        totalCount={totalCount}
        isSelected={isSelected}
        onChecked={onChecked}
      />
    </>
  );
};

export default User;