import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  deleteData,
  editData,
  addData,
  setFilter,
} from "../reduser/counter";
import ModalComponent from "./modal";

const IDCart = () => {
  const dispatch = useDispatch();
  const { filteredItems, loading, error } = useSelector((state) => state.data);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  const itemsPerPage = 6;

  const handleOpen = (item = null) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    dispatch(setFilter(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="dots-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  const sortedItems = sortItems(filteredItems);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="font-mono mt-[100px]">
      <div className="flex items-center justify-between
      my-[5%]">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name..."
          className=" p-2 border rounded"
        />

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {sortOrder === "asc" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-sort-numeric-down-alt"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"
              />
              <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-sort-numeric-up-alt"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"
              />
              <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z" />
            </svg>
          )}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-[50px] flex-wrap">
        {currentItems.map((item) => (
          <Card
            key={item.id}
            item={item}
            dispatch={dispatch}
            onEdit={handleOpen}
          />
        ))}

        <ModalComponent
          open={open}
          handleClose={handleClose}
          initialValues={
            currentItem || { id: null, name: "", description: "", price: "" }
          }
          onSubmit={(values) => {
            if (values.id) {
              dispatch(editData(values));
            } else {
              dispatch(addData(values));
            }
            handleClose();
          }}
          idx={currentItem?.id}
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          {`<`}
        </button>
        <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};

const Card = ({ item, dispatch, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleInfo = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    dispatch(deleteData(item.id));
  };

  return (
    <div className="w-[350px] h-auto border rounded-md shadow-md p-4">
      <h2 className="font-bold text-[22px] my-[10px] text-[#333]">
        {item.name}
      </h2>
      <p className="text-[16px] text-gray-500">
        {isExpanded ? item.description : `${item.description.slice(0, 50)}`}
        {item.description.length > 50 && !isExpanded && (
          <button
            onClick={toggleInfo}
            className="text-blue-500 ml-2 hover:underline"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </p>
      <p className="text-[20px] font-semibold mt-4 text-gray-700">
        ${item.price}
      </p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-700"
      >
        Delete
      </button>
      <button
        onClick={() => onEdit(item)}
        className="bg-green-600 ml-[10px] text-white px-4 py-2 mt-4 rounded hover:bg-green-700"
      >
        Edit
      </button>
    </div>
  );
};

export default IDCart;
