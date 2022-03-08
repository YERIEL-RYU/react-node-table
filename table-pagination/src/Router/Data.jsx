import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/Table'
import { requestData, checkOccurrence } from '../store/table';

const Data = () => {
  const dispatch = useDispatch()

  const datas = useSelector(state=>state.table.data);
  const totalCount = useSelector(state=>state.table.dataLen);
  const selectData = useSelector(state=>state.table.selectData);

  const [columns, setColumns] = useState([]);
  const [selectedDatas, setSelectedDatas] = useState([]);

  useEffect(()=>{
    dispatch(requestData())
  },[dispatch])

  useEffect(()=>{
    if ( datas.length !== 0 ) {
      setColumns(Object.keys(datas[0]))
    }
  }, [datas])

  const [page, setPage] = useState(0)

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
    dispatch(requestData(newPage))
  };
    
  const isSelected = (row) => selectedDatas.map(item => item.id).includes(row)

  const onChecked = (e, data) => {
    var selectedDataIndex = null;
    let newSelectedData = [];
    let subDatas = [];

    if (selectedDatas.length === 0) {
      selectedDataIndex = -1;
      newSelectedData = newSelectedData.concat(subDatas, data);
      setSelectedDatas([{page:page, data:newSelectedData}]);
    }

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
      <h3>Data</h3>
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

export default Data;