import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkOccurrence, requestTableData } from '../store/table';
import Table from '../components/Table'

const User = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(requestTableData())
  },[dispatch])

  const [page, setPage] = useState(0)
  const datas = useSelector(state=>state.table.user);
  const totalCount = useSelector(state=>state.table.userLen);
  const selectCount = useSelector(state=>state.table.selectData).map(item=>item.page === page)
  const [columns, setColumns] = useState([]);
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(()=>{
    if ( datas.length !== 0) {
      setColumns(Object.keys(datas[0]))
    }
  }, [datas])


  const handleChangePage = (e, newPage) => {
    setPage(newPage)
    dispatch(requestTableData(newPage))
  }
  
  const isSelected = (row) => {
    selectedDatas.filter(item=>item.page === page ? item.data.map(list => list.id).includes(row): item)
  }

  const onChecked = (e, data) => {
    // console.log(selectedDatas.length)
    var selectedDataIndex = null
    var subDatas = []
    let newSelectedData = []
    if (selectedDatas.length === 0){
      console.log('111')
      selectedDataIndex = -1;
      newSelectedData = newSelectedData.concat(subDatas, data);
      setSelectedDatas([{page:page, data:newSelectedData}]);
    }else if (selectedDatas.length ===1) {
      console.log('222')
      var pageIndex = selectedDatas.filter(item=>item.page===page)
      if (pageIndex.length !== 0) {
        subDatas = pageIndex[0].data
        selectedDataIndex = subDatas.indexOf(data)
        console.log(selectedDataIndex)
        if (selectedDataIndex === -1) {
          newSelectedData = newSelectedData.concat(subDatas, data);
          setSelectedDatas([{page:page, data:newSelectedData}]);
        } else if (selectedDataIndex === 0) {
          newSelectedData = newSelectedData.concat(subDatas.slice(1));
          setSelectedDatas([]);
        } else if (selectedDataIndex === subDatas.length - 1) {
          newSelectedData = newSelectedData.concat(subDatas.slice(0, -1));
          setSelectedDatas([{page:page, data:newSelectedData}]);
        } else if (selectedDataIndex > 0) {
          newSelectedData = newSelectedData.concat(
            subDatas.slice(0, selectedDataIndex),
            subDatas.slice(selectedDataIndex + 1),
          );
          setSelectedDatas([{page:page, data:newSelectedData}]);
        }
      }else {
        newSelectedData = newSelectedData.concat(subDatas, data);
        setSelectedDatas([{page:page, data:newSelectedData}]);
        setSelectedDatas([...selectedDatas, {page:page, data: newSelectedData}])
      }
    } else {
      console.log('333')
      pageIndex = selectedDatas.filter(item=>item.page===page)
      if (pageIndex.length !== 0) {
        subDatas = pageIndex[0].data
        selectedDataIndex = subDatas.indexOf(data)
        console.log(selectedDataIndex)
        if ( selectedDataIndex === -1 ){
          setSelectedDatas(selectedDatas.map(item=>item.page === page ? {page: item.page, data: item.data.concat(data)} : item))
        } else if (selectedDataIndex === 0) {
          setSelectedDatas(selectedDatas.filter(item=>item.page !== page))
        } else if ( selectedDataIndex === subDatas.length -1){
          console.log('qqqqq')
        } else if ( selectedDataIndex > 0 ){
          console.log('bbbb')
        } 
      }else {
        newSelectedData = newSelectedData.concat(subDatas, data);
        setSelectedDatas([{page:page, data:newSelectedData}]);
        setSelectedDatas([...selectedDatas, {page:page, data: newSelectedData}])        
      }
    }
    // console.log("selectedDataIndex : ", selectedDataIndex)
    // console.log('tetetet : ', subDatas)
    // 값 유무 체크
    // setSelectedDatas([{page:page, data:newSelectedData}]);
  };

  // const isSelected = (row) => selectedDatas.map(item => item.id).includes(row)

  // const onChecked = (e, data) => {
  //   const selectedDataIndex = selectedDatas.indexOf(data);
  //   let newSelectedData = []
  //   console.log(selectedDataIndex)
  //   // 값 유무 체크
  //   if (selectedDataIndex === -1) {
  //     newSelectedData = newSelectedData.concat(selectedDatas, data);
  //   } else if (selectedDataIndex === 0) {
  //     newSelectedData = newSelectedData.concat(selectedDatas.slice(1));
  //   } else if (selectedDataIndex === selectedDatas.length - 1) {
  //     newSelectedData = newSelectedData.concat(selectedDatas.slice(0, -1));
  //   } else if (selectedDataIndex > 0) {
  //     newSelectedData = newSelectedData.concat(
  //       selectedDatas.slice(0, selectedDataIndex),
  //       selectedDatas.slice(selectedDataIndex + 1),
  //     );
  //   }

  //   setSelectedDatas(newSelectedData);
  // };

  useEffect(()=>{
    dispatch(checkOccurrence(selectedDatas))
  },[dispatch, selectedDatas]);

  const onAllCheck = (e) => {
    var checked = e.target.checked
    if (checked) {
      setSelectedDatas(datas)
      setAllChecked(true)
    } else {
      setSelectedDatas([])
      setAllChecked(false)
    }
  };

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
        selectCount={selectCount}
        onAllCheck={onAllCheck}
      />
    </>
  );
};

export default User;