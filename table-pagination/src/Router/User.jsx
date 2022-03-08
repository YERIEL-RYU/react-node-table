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
  const selectData = useSelector(state=>state.table.selectData);
  const [columns, setColumns] = useState([]);
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [selectCount, setSelectCount] = useState(0)

  useEffect(()=>{
    if ( datas.length !== 0) {
      setColumns(Object.keys(datas[0]))
    }
  }, [datas]);
  useEffect(()=>{
    var count = 0
    if (selectData.length !== 0) {
      setSelectedDatas(selectData)
      for (var item of selectData) {
        count += item.data.length
      }
    }
    setSelectCount(count)
  },[selectData]);
  useEffect(()=>{
    for (var item  of selectedDatas) {
      if (item.page === page) {
        if(item.data.length === datas.length) {
          setAllChecked(true)
          return;
        }else {
          setAllChecked(false)
          return;
        }
      }else {
        setAllChecked(false)
      }  
    }
  },[page, selectedDatas, datas])


  const handleChangePage = (e, newPage) => {
    setPage(newPage)
    dispatch(requestTableData(newPage))
  }
  
  const isSelected = (row) => {
    var trueCount = 0;
    for (var item of selectedDatas){
      var data = item.data;
      if (page === item.page) {
        for (var i of data) {
          for (var j in i) {
            if (i[j] === row[j]) {
              trueCount++;
            }
            if (trueCount === columns.length) return true;
          }
        }
      }
    }
    return false;
  };

  const onIsSelectedIndex = (row) => {
    // const checked = selectedDatas.filter(item=>item.page === page ? item.data.map(list => list.id).includes(row): false)
    // return checked.length !== 0 ? true : false;
    var trueCount = 0;
    var trueList = [];
    for (var item of selectedDatas){
      var data = item.data;
      if (page === item.page) {
        for (var i of data) {
          for (var j in i) {
            if (i[j] === row[j]) trueCount++;
          }
          trueCount === columns.length ? trueList.push(true) : trueList.push(false);
          trueCount = 0;
        }
      }
    }
    return trueList.indexOf(true)
  }

  const onChecked = (e, data) => {
    var selectedDataIndex = onIsSelectedIndex(data)
    var subDatas = []
    let newSelectedData = []
    if (selectedDatas.length === 0){
      selectedDataIndex = -1;
      newSelectedData = newSelectedData.concat(subDatas, data);
      setSelectedDatas([{page:page, data:newSelectedData}]);
    }else if (selectedDatas.length ===1) {
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
          setSelectedDatas([{page: page, data: newSelectedData}]);
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
      pageIndex = selectedDatas.filter(item=>item.page===page)
      if (pageIndex.length !== 0) {
        subDatas = pageIndex[0].data
        if ( selectedDataIndex === -1 ){
          setSelectedDatas(selectedDatas.map(item=>item.page === page ? {page: item.page, data: item.data.concat(data)} : item))
        } else if (selectedDataIndex === 0) {
          newSelectedData = newSelectedData.concat(subDatas.slice(1));
          const listItem = selectedDatas.filter(list=>list.page === page ? list.data = newSelectedData:list)
          setSelectedDatas(listItem);
        } else if ( selectedDataIndex === subDatas.length -1){
          newSelectedData = newSelectedData.concat(subDatas.slice(0, -1));
          const listItem = selectedDatas.filter(list=>list.page === page ? list.data = newSelectedData:list)
          setSelectedDatas(listItem);
        } else if ( selectedDataIndex > 0 ){
          newSelectedData = newSelectedData.concat(
            subDatas.slice(0, selectedDataIndex),
            subDatas.slice(selectedDataIndex + 1),
          );
          const listItem = selectedDatas.filter(list=>list.page === page ? list.data = newSelectedData:list)
          setSelectedDatas(listItem);
        } 
      }else {
        newSelectedData = newSelectedData.concat(subDatas, data);
        setSelectedDatas([{page:page, data:newSelectedData}]);
        setSelectedDatas([...selectedDatas, {page:page, data: newSelectedData}])        
      }
    }
    if(subDatas.length === datas.length -1 ) {
      setAllChecked(true)
    }else {
      setAllChecked(false)
    }
  };

  useEffect(()=>{
    dispatch(checkOccurrence(selectedDatas))
  },[dispatch, selectedDatas]);

  const onAllCheck = (e) => {
    if (selectedDatas.length === 0) {
      setSelectedDatas([{page: page, data: datas}])
      setAllChecked(true)
    }else{
      for (var item of selectedDatas) {
        if(item.page === page && item.data.length === datas.length) {
          const listItem = selectedDatas.filter(list=>list.page === page ? list.data = [] : list)
          setSelectedDatas(listItem)
          setAllChecked(false)
          return;
        }else if (item.page === page && item.data.length !== datas.length) {
          const listItem = selectedDatas.filter(list=>list.page === page ? list.data = datas : list)
          setSelectedDatas(listItem)
          setAllChecked(true)
          return;
        }else {
          setAllChecked(true)
          setSelectedDatas([...selectedDatas, {page: page, data: datas}])
        }
      }
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
        onAllCheck={onAllCheck}
        allChecked={allChecked}
        selectCount={selectCount}
      />
    </>
  );
};

export default User;